import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@shared';
import { ComponentsModule } from '@shared/components/components.module';

import { SkillRoutingModule } from './skill-routing.module';
import { SkillTableComponent } from './skill-table/skill-table.component';
import { SkillFormComponent } from './skill-form/skill-form.component';


@NgModule({
  declarations: [
    SkillTableComponent,
    SkillFormComponent
  ],
  imports: [
    CommonModule,
    SkillRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SharedModule
  ]
})
export class SkillModule { }
