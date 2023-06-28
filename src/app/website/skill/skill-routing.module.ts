import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillTableComponent } from './skill-table/skill-table.component';

const routes: Routes = [
  {
    path: '',
    component: SkillTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillRoutingModule { }
