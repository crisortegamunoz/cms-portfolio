import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, DeleteDialogComponent],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent, DeleteDialogComponent],
})
export class ComponentsModule {}
