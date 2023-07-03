import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperienceRoutingModule } from './experience-routing.module';
import { ExperienceTableComponent } from './experience-table/experience-table.component';


@NgModule({
  declarations: [
    ExperienceTableComponent
  ],
  imports: [
    CommonModule,
    ExperienceRoutingModule
  ]
})
export class ExperienceModule { }
