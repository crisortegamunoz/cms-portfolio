import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';

import { AboutRoutingModule } from './about-routing.module';
import { AboutTableComponent } from './components/about-table/about-table.component';
import { AboutFormComponent } from './components/about-form/about-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    AboutTableComponent,
    AboutFormComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class AboutModule { }
