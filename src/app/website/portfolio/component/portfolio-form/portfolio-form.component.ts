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
  constructor(private route: ActivatedRoute,
              private categoryService: CategoryService,
              private technologyService: TechnologyService,
              private formBuilder: FormBuilder) {
      this.loading = true;
      this.title = '';
      this.subtitle = '';
      this.categories = [];
      this.technologies = [];
  }

  ngOnInit() {
    this.categoryService.getAll().pipe(
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

  get technologyControls() {
    return this.portfolioStep2?.get('technologyList') as FormArray;
  }

  addTechnology() {
    if (this.technologyControls.controls.some(control => control.value !== null && control.value !== '')) {
      const newTechControl = this.formBuilder.control(null);
      this.technologyControls.push(newTechControl);
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
    this.unMask();
  }

  private loadFormById(id: number) {
    this.subtitle = `Editar Portafolio N°${id}`;
    this.loadFormStep1();
    this.loadFormStep2();
    this.unMask();
  }

  private loadFormStep1() {
    this.portfolioStep1 = this.formBuilder.group({
      portfolioName: ['', Validators.required],
      clientName: ['', Validators.required],
      repository: [''],
      demo: [''],
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

  private unMask(){
    this.loading = !this.loading;
  }

}

