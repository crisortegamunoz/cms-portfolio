import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificateTableComponent } from './component/certificate-table/certificate-table.component';

const routes: Routes = [
  {
    path: '',
    component: CertificateTableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CertificateRoutingModule { }
