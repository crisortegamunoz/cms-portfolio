import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutTableComponent } from './about-table/about-table.component';

const routes: Routes = [
  {
    path: '',
    component: AboutTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
