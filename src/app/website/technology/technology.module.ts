import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';
import { TechnologyRoutingModule } from './technology-routing.module';

import { TechnologyTableComponent } from './technology-table/technology-table.component';
import { TechnologyFormComponent } from './technology-form/technology-form.component';


@NgModule({
  declarations: [
    TechnologyTableComponent,
    TechnologyFormComponent
  ],
  imports: [
    CommonModule,
    TechnologyRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ]
})
export class TechnologyModule { }
