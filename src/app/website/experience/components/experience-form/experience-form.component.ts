import { Component, OnInit } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryDTO } from '@core/models/website/category.model';
import { CategoryService } from '@core/service/website/category.service';
import { TechnologyService } from '@core/service/website/technology.service';
import { TechnologyDTO } from '@core/models/website/technology.model';
import { SwalConfig } from '@core/swal/config';
import { ExperienceDTO } from '@core/models/website/experience.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ExperienceService } from '@core/service/website/experience.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.scss']
})
export class ExperienceFormComponent implements OnInit {

  loading: boolean;
  title: string;
  subtitle: string;
  categories: CategoryDTO[];
  technologies: TechnologyDTO[];
  isLinear = false;
  experienceStep1?: FormGroup;
  experienceStep2?: FormGroup;
  experienceStep3?: FormGroup;
  experience: ExperienceDTO;
  maxDate: Date;
  show: string;
  entityTextLabel: string;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private experienceService: ExperienceService,
              private categoryService: CategoryService,
              private technologyService: TechnologyService,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService) {
      this.loading = true;
      this.title = '';
      this.subtitle = '';
      this.categories = [];
      this.technologies = [];
      this.experience = {} as ExperienceDTO;
      this.maxDate = new Date();
      this.show = '';
      this.entityTextLabel = '';
  }

  ngOnInit() {
    this.spinner.show();
    this.categoryService.getBySection('EXPERIENCE').pipe(
      switchMap(categories => {
        this.categories = categories;
        return this.technologyService.getAll();
      }),
      switchMap(technologies => {
        this.technologies = technologies;
        return this.route.paramMap;
      })
    ).subscribe(paramMap => {
      this.loadFormProccess(paramMap.get('id'));
    });
  }

  onCategorySelectionChange(event: MatSelectChange) {
    const category: CategoryDTO = event.value;

    if (category.name === 'Trabajo') {
      this.entityTextLabel = 'Nombre Empresa';
    } else {
      this.entityTextLabel = 'Nombre Entidad Educacional';
    }
    this.show = category.name
  }

  onAddTechnologies(technologies: TechnologyDTO[]): void {
    this.technologyControls.clear();
    if (technologies.length > 0) {
      technologies.forEach(technology => {
        this.technologyControls.push(this.formBuilder.group(technology));
      });
    } else {
      SwalConfig.simpleModalWarning('Advertencia', 'Debes tener al menos una tecnología agregada asociada al proyecto');
    }
  }

  create() {
    this.spinner.show();
    const steps = this.validateSteps();
    if (steps.length > 0) {
      const lastStep = steps.length > 1 ?  steps.pop() : null;
      const msg = `Debes completar ${lastStep ? 'los' : 'el'} paso${lastStep ? 's' : ''} ${steps} ${lastStep ? 'y' : ''} ${lastStep ? lastStep : ''}`;
      SwalConfig.simpleModalError('Formulario inválido', msg);
      this.spinner.hide();
      return;
    }
    this.savePortfolio();
  }

  private savePortfolio(): void {
    this.experience = this.experienceStep1?.getRawValue();
    this.experience.technologies = this.experienceStep2?.getRawValue().technologyList;
    this.experience.responsibilities = this.experienceStep3?.getRawValue().descriptionList;
    this.experienceService.save(this.experience).subscribe(() => {
      this.spinner.hide();
      this.router.navigate(['experience']);
    });
  }

  get technologyControls() {
    return this.experienceStep2?.get('technologyList') as FormArray;
  }

  get descriptionControls() {
    return this.experienceStep3?.get('descriptionList') as FormArray;
  }

  addDescription() {
    if (this.descriptionControls.controls.some(control => control.value !== null && control.value !== '')) {
      this.descriptionControls.push(this.formBuilder.control(null));
    } else {
      SwalConfig.simpleModalWarning('Oops!', 'Recuerda completar la responsabilidad antes de agregar una nueva');
    }
  }

  removeDescription(index: number) {
    if (this.descriptionControls.controls.length === 1) {
      SwalConfig.simpleModalWarning('Oops!', 'Al menos debe haber alguna responsabilidad');
    } else {
      this.descriptionControls.removeAt(index);
    }
  }

  private loadFormProccess(id: string | null): void {
    if (id) {
      this.loadFormById(parseInt(id));
    } else {
      this.initForm();
    }
  }

  private initForm() {
    this.subtitle = `Crear`;
    this.title = 'Crear Nueva Experiencia'
    this.loadFormStep1();
    this.loadFormStep2();
    this.loadFormStep3();
    this.showComponent();
  }

  private loadFormById(id: number) {
    this.subtitle = `Editar Experiencia N°${id}`;
    this.loadFormStep1();
    this.loadFormStep2();
    this.loadFormStep3();
    this.showComponent();
  }

  private loadFormStep1() {
    this.experienceStep1 = this.formBuilder.group({
      roleName: [''],
      roleDescription: [''],
      entityName: ['', Validators.required],
      entityLocation: ['', Validators.required],
      entityDescription: [''],
      periodStart: ['', Validators.required],
      periodEnd: [''],
      category: ['', Validators.required],
    });
  }

  private loadFormStep2() {
    this.experienceStep2 = this.formBuilder.group({
      technologyList: this.formBuilder.array([])
    });
  }

  private loadFormStep3() {
    this.experienceStep3 = this.formBuilder.group({
      descriptionList: this.formBuilder.array([this.formBuilder.control('')], Validators.required)
    });
  }

  private validateSteps(): number[] {
    const steps = [
      { step: 1, valid: this.experienceStep1?.valid},
      { step: 2, valid: this.experienceStep2?.valid},
      { step: 3, valid: this.experienceStep3?.valid}
    ];
    return steps.reduce((array: number[], { step, valid }) => {
      if (!valid) {
        array.push(step);
      }
      return array;
    }, []);
  }

  private showComponent() {
    this.loading = !this.loading;
    this.spinner.hide();
  }

}

