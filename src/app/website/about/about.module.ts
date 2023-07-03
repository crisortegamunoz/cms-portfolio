import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';

import { AboutRoutingModule } from './about-routing.module';
import { AboutTableComponent } from './about-table/about-table.component';


@NgModule({
  declarations: [
    AboutTableComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ]
})
export class AboutModule { }
