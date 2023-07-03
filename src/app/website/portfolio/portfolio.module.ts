import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioTableComponent } from './portfolio-table/portfolio-table.component';


@NgModule({
  declarations: [
    PortfolioTableComponent
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
