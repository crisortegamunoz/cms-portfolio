import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ImageComponent } from './image/image.component';

@NgModule({
  declarations: [FileUploadComponent, BreadcrumbComponent, ImageComponent],
  imports: [SharedModule],
  exports: [FileUploadComponent, BreadcrumbComponent, ImageComponent],
})
export class ComponentsModule {}
