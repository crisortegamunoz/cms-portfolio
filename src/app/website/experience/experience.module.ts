import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';

import { ExperienceRoutingModule } from './experience-routing.module';
import { ExperienceTableComponent } from './experience-table/experience-table.component';


@NgModule({
  declarations: [
    ExperienceTableComponent
  ],
  imports: [
    CommonModule,
    ExperienceRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ]
})
export class ExperienceModule { }
