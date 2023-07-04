import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, of, switchMap } from 'rxjs';
import { getStorage, ref, uploadBytes, UploadResult, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

import { CategoryDTO } from '@core/models/website/category.model';
import { CategoryService } from '@core/service/website/category.service';
import { TechnologyService } from '@core/service/website/technology.service';
import { TechnologyDTO } from '@core/models/website/technology.model';
import { SwalConfig } from '@core/swal/config';
import { PortfolioDTO } from '@core/models/website/portfolio.model';
import { CustomValidators } from '@core/validator/custom';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-portfolio-form',
  templateUrl: './portfolio-form.component.html',
  styleUrls: ['./portfolio-form.component.scss']
})
export class PortfolioFormComponent implements OnInit {

  loading: boolean;
  title: string;
  subtitle: string;
  categories: CategoryDTO[];
  technologies: TechnologyDTO[];
  isLinear = false;
  portfolioStep1?: FormGroup;
  portfolioStep2?: FormGroup;
  portfolioStep3?: FormGroup;
  portfolio: PortfolioDTO;
  maxDate: Date;
  private REG = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private technologyService: TechnologyService,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService) {
      this.loading = true;
      this.title = '';
      this.subtitle = '';
      this.categories = [];
      this.technologies = [];
      this.portfolio = {} as PortfolioDTO;
      this.maxDate = new Date();
  }

  ngOnInit() {
    this.spinner.show();
    this.categoryService.getBySection('PORTFOLIO').pipe(
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

  create() {
    this.loading = true;
    const steps = this.validateSteps();
    if (steps.length > 0) {
      const lastStep = steps.length > 1 ?  steps.pop() : null;
      const msg = `Debes completar ${lastStep ? 'los' : 'el'} paso${lastStep ? 's' : ''} ${steps} ${lastStep ? 'y' : ''} ${lastStep ? lastStep : ''}`;
      SwalConfig.simpleModalError('Formulario inválido', msg);
      this.loading = false;
      return;
    }
    this.portfolio = this.portfolioStep1?.getRawValue();
    this.portfolio.technologies = this.portfolioStep2?.getRawValue().technologyList;
    this.portfolio.descriptions = this.portfolioStep3?.getRawValue().descriptionList;
  }

  get technologyControls() {
    return this.portfolioStep2?.get('technologyList') as FormArray;
  }

  addTechnology() {
    if (this.technologyControls.controls.some(control => control.value !== null && control.value !== '')) {
      this.technologyControls.push(this.formBuilder.control(null));
    } else {
      SwalConfig.simpleModalWarning('Oops!', 'Recuerda seleccionar una tecnología antes de agregar una nueva');
    }
  }

  removeTechnology(index: number) {
    if (this.technologyControls.controls.length === 1) {
      SwalConfig.simpleModalWarning('Oops!', 'Al menos debe haber alguna tecnología seleccionada');
    } else {
      this.technologyControls.removeAt(index);
    }
  }

  get descriptionControls() {
    return this.portfolioStep3?.get('descriptionList') as FormArray;
  }

  addDescription() {
    if (this.descriptionControls.controls.some(control => control.value !== null && control.value !== '')) {
      this.descriptionControls.push(this.formBuilder.control(null));
    } else {
      SwalConfig.simpleModalWarning('Oops!', 'Recuerda completar la descripción antes de agregar una nueva');
    }
  }

  removeDescription(index: number) {
    if (this.descriptionControls.controls.length === 1) {
      SwalConfig.simpleModalWarning('Oops!', 'Al menos debe haber alguna descripción');
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
    this.title = 'Crear Nuevo Portafolio'
    this.loadFormStep1();
    this.loadFormStep2();
    this.loadFormStep3();
    //this.loading = false;
  }

  private loadFormById(id: number) {
    this.subtitle = `Editar Portafolio N°${id}`;
    this.loadFormStep1();
    this.loadFormStep2();
    this.loadFormStep3();
    //this.loading = false;
  }

  private loadFormStep1() {
    this.portfolioStep1 = this.formBuilder.group({
      portfolioName: ['', Validators.required],
      clientName: [''],
      repository: ['', Validators.pattern(this.REG)],
      demo: ['', Validators.pattern(this.REG)],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      img: ['', Validators.required],
      publishDate: [new Date(), Validators.required],
      category: ['', Validators.required],
    });
  }

  private loadFormStep2() {
    this.portfolioStep2 = this.formBuilder.group({
      technologyList: this.formBuilder.array([this.formBuilder.control('')], Validators.required)
    });
  }

  private loadFormStep3() {
    this.portfolioStep3 = this.formBuilder.group({
      descriptionList: this.formBuilder.array([this.formBuilder.control('')], Validators.required)
    });
  }

  private validateSteps(): number[] {
    const steps = [
      { step: 1, valid: this.portfolioStep1?.valid},
      { step: 2, valid: this.portfolioStep2?.valid},
      { step: 3, valid: this.portfolioStep3?.valid}
    ];
    return steps.reduce((array: number[], { step, valid }) => {
      if (!valid) {
        array.push(step);
      }
      return array;
    }, []);
  }

}

