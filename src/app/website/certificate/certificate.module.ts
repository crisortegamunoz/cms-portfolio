import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';

import { CertificateRoutingModule } from './certificate-routing.module';
import { CertificateTableComponent } from './component/certificate-table/certificate-table.component';
import { CertificateFormComponent } from './component/certificate-form/certificate-form.component';


@NgModule({
  declarations: [
    CertificateTableComponent,
    CertificateFormComponent
  ],
  imports: [
    CommonModule,
    CertificateRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ]
})
export class CertificateModule { }
