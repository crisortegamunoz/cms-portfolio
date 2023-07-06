import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperienceTableComponent } from './components/experience-table/experience-table.component';
import { ExperienceFormComponent } from './components/experience-form/experience-form.component';

const routes: Routes = [
  {
    path: '',
    component: ExperienceTableComponent
  },
  {
    path: 'form',
    component: ExperienceFormComponent
  },
  {
    path: 'form/:id',
    component: ExperienceFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperienceRoutingModule { }
