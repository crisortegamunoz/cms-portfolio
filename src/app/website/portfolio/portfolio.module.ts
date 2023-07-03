import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioTableComponent } from './component/portfolio-table/portfolio-table.component';
import { PortfolioFormComponent } from './component/portfolio-form/portfolio-form.component';


@NgModule({
  declarations: [
    PortfolioTableComponent,
    PortfolioFormComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ]
})
export class PortfolioModule { }
