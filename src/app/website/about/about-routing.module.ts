import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutTableComponent } from './components/about-table/about-table.component';
import { AboutFormComponent } from './components/about-form/about-form.component';

const routes: Routes = [
  {
    path: '',
    component: AboutTableComponent
  },
  {
    path: 'form',
    component: AboutFormComponent
  },
  {
    path: 'form/:id',
    component: AboutFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
