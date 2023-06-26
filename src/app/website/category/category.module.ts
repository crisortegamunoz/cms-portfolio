import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';

import { CategoryTableComponent } from './component/category-table/category-table.component';
import { CategoryFormComponent } from './component/category-form/category-form.component';


@NgModule({
  declarations: [
    CategoryTableComponent,
    CategoryFormComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ]
})
export class CategoryModule { }
