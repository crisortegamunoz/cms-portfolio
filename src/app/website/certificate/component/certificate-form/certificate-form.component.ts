import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable, of, switchMap } from 'rxjs';
import { getStorage, ref, uploadBytes, UploadResult, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../../../environments/environment';

import { DialogData } from '@core/models/website/dialog.model';
import { CertificateDTO } from '@core/models/website/certificate.model';
import { CategoryDTO } from '@core/models/website/category.model';
import { CategoryService } from '@core/service/website/category.service';
import { CertificateService } from '@core/service/website/certificate.service';
import { ImageComponent } from '@shared/components/image/image.component';


@Component({
  selector: 'app-certificate-form',
  templateUrl: './certificate-form.component.html',
  styleUrls: ['./certificate-form.component.scss']
})
export class CertificateFormComponent implements OnInit {

  private PATH = 'images/certificate';
  private storage = getStorage(initializeApp(environment.firebase));
  action: string;
  dialogTitle: string;
  certificateForm: UntypedFormGroup;
  certificate: CertificateDTO;
  categories: CategoryDTO[];
  formControl = new UntypedFormControl('', [Validators.required]);
  showPdf: boolean;
  showImg: boolean;

  constructor(public dialogRef: MatDialogRef<CertificateFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData<CertificateDTO>,
              private fb: UntypedFormBuilder,
              private certificateService: CertificateService,
              private categoryService: CategoryService,
              private dialog: MatDialog) {
    // Set the defaults
    this.categories = [];
    this.action = data.action;
    if (this.action === 'edit') {
      this.showPdf = false;
      this.showImg = false;
      this.certificate = { ... data.object };
      this.dialogTitle = `${this.certificate.name}`;
      this.certificateForm = this.createCertificateForm();
    } else {
      this.showPdf = true;
      this.showImg = true;
      this.dialogTitle = 'Crear Certificado';
      this.certificate = {} as CertificateDTO;
      this.certificateForm = this.createCertificateForm();
    }
  }

  ngOnInit(): void {
    this.loadLists().subscribe();
  }

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : '';
  }

  createCertificateForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.certificate.id],
      name: [this.certificate.name, [Validators.required, Validators.maxLength(100)]],
      pdfUrl: [this.certificate.pdfUrl, [Validators.required, Validators.maxLength(50)]],
      imgUrl: [this.certificate.imgUrl, [Validators.required]],
      entityName: [this.certificate.entityName, [Validators.required]],
      completed: [this.certificate.completed, [Validators.required]],
      category: [this.certificate.category, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAdd(): void {
    this.uploadFiles(this.loadFiles());
  }

  showFile(showPdf: boolean) {
    this.dialog.open(ImageComponent, {
      data: {
        showPdf: showPdf,
        url: showPdf ? this.certificate.pdfUrl : this.certificate.imgUrl
      }
    });
  }

  removeFile(type: string, formControlName: string) {
    if (type === 'pdf') {
      this.certificateForm.get(formControlName)?.setValue(null);
      this.showPdf = true;
    } else {
      this.certificateForm.get(formControlName)?.setValue(null);
      this.showImg = true;
    }
  }

  private saveCertificate(filesUrl: string[]): void {
    const pdfUrl = filesUrl.find(value => value.includes('pdf') || this.certificate.pdfUrl);
    const imgUrl = filesUrl.find(value => value.includes('png') || this.certificate.imgUrl);
    this.certificate = this.certificateForm.getRawValue();
    this.certificate.pdfUrl = pdfUrl;
    this.certificate.imgUrl = imgUrl;
    this.certificateService.save(this.certificate).subscribe((data) => {
      this.dialogRef.close();
    });
  }

  private uploadFiles(files: File[]): void {
    const uploadPromises: Promise<UploadResult>[] = [];
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      const storageRef = ref(this.storage, `${this.PATH}/${file.name}`);
      const uploadPromise = uploadBytes(storageRef, file);
      uploadPromises.push(uploadPromise);
    }
    Promise.all(uploadPromises)
      .then((snapshots: UploadResult[]) => {
        const downloadURLPromises: Promise<string>[] = [];
        snapshots.forEach((snapshot: UploadResult) => {
          const storageRef = ref(this.storage, snapshot.ref.fullPath);
          const downloadURLPromise = getDownloadURL(storageRef);
          downloadURLPromises.push(downloadURLPromise);
        });
        return Promise.all(downloadURLPromises);
      })
      .then((downloadURLs: string[]) => {
        this.saveCertificate(downloadURLs);
      })
      .catch((error: any) => {
        console.error('Error al subir las imágenes:', error);
      });
  }

  private loadFiles(): File[] {
    const pdf: File = this.certificateForm.getRawValue().pdfUrl.files[0];
    const image: File = this.certificateForm.getRawValue().imgUrl.files[0]
    return [pdf, image];
  }

  private loadLists(): Observable<any>  {
    return this.categoryService.getBySection('CERTIFICATE')
    .pipe(
      switchMap((categories: CategoryDTO[]) => {
        this.categories = categories;
        return of();
      })
    );
  }

}
