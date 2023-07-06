import { Component, OnInit } from '@angular/core';
import { Validators, FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { switchMap } from 'rxjs';
import { UploadResult } from 'firebase/storage';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { AboutDTO } from '@core/models/website/about.model';
import { AboutService } from '@core/service/website/about.service';
import { SwalConfig } from '@core/swal/config';
import { CommonFunctions } from '@core/util/common';

@Component({
  selector: 'app-about-form',
  templateUrl: './about-form.component.html',
  styleUrls: ['./about-form.component.scss']
})
export class AboutFormComponent implements OnInit {

  loading: boolean;
  title: string;
  subtitle: string;
  isLinear = false;
  aboutStep1?: FormGroup;
  aboutStep2?: FormGroup[] = [];
  about: AboutDTO;
  maxDate: Date;
  private PATH = 'images/about';
  constructor(private route: ActivatedRoute,
              private router: Router,
              private aboutService: AboutService,
              private formBuilder: FormBuilder,
              private spinner: NgxSpinnerService) {
      this.loading = true;
      this.title = '';
      this.subtitle = '';
      this.about = {} as AboutDTO;
      this.maxDate = new Date();
  }

  ngOnInit() {
    this.spinner.show();
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.loadFormProccess(id);
      } else {
        this.initForm();
      }
    });
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
    this.uploadFiles([this.aboutStep1?.getRawValue().img.files[0]]);
  }

  private savePortfolio(fileUrl: string): void {
    /*const img = fileUrl ? fileUrl : this.portfolio.img;
    this.portfolio = this.portfolioStep1?.getRawValue();
    this.portfolio.technologies = this.portfolioStep2?.getRawValue().technologyList;
    this.portfolio.descriptions = this.portfolioStep3?.getRawValue().descriptionList;
    this.portfolio.img = img;
    this.portfolioService.save(this.portfolio).subscribe(() => {
      this.spinner.hide();
      this.router.navigate(['portfolio']);
    });*/
  }

  private uploadFiles(files: File[]): void {
    const uploadPromises: Promise<UploadResult>[] = CommonFunctions.uploadToFirebase(files, this.PATH);
    Promise.all(uploadPromises)
      .then((snapshots: UploadResult[]) => {
        const downloadURLPromises: Promise<string>[] = CommonFunctions.getUrlFromFirebase(snapshots);
        return Promise.all(downloadURLPromises);
      })
      .then((downloadURLs: string[]) => {
        this.savePortfolio(downloadURLs.length > 0 ? downloadURLs[0] : '');
      })
      .catch((error: any) => {
        console.error('Error al subir las imágenes:', error);
      });
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
    this.title = 'Crear información sobre mí'
    this.loadFormStep1();
    this.showComponent();
  }

  private loadFormById(id: number) {
    this.subtitle = `Editar información sobre mí N°${id}`;
    this.loadFormStep1();
    this.showComponent();
  }

  private loadFormStep1() {
    this.aboutStep1 = this.formBuilder.group({
      title: ['', Validators.required],
      descriptionList: this.formBuilder.array([this.formBuilder.control('')], Validators.required)
    });
  }

  private validateSteps(): number[] {
    const steps = [
      { step: 1, valid: this.aboutStep1?.valid}
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

  get descriptionControls() {
    return this.aboutStep1?.get('descriptionList') as FormArray;
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

}
