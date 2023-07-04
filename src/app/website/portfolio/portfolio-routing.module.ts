import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioTableComponent } from './component/portfolio-table/portfolio-table.component';
import { PortfolioFormComponent } from './component/portfolio-form/portfolio-form.component';

const routes: Routes = [
  {
    path: '',
    component: PortfolioTableComponent
  },
  {
    path: 'form',
    component: PortfolioFormComponent
  },
  {
    path: 'form/:id',
    component: PortfolioFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
