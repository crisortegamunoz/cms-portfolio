import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';

import { ExperienceRoutingModule } from './experience-routing.module';
import { ExperienceTableComponent } from './components/experience-table/experience-table.component';
import { ExperienceFormComponent } from './components/experience-form/experience-form.component';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [
    ExperienceTableComponent,
    ExperienceFormComponent
  ],
  imports: [
    CommonModule,
    ExperienceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule,
    NgxSpinnerModule
  ]
})
export class ExperienceModule { }
