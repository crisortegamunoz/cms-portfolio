import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ImageComponent } from './image/image.component';
import { AddTechnologyComponent } from './add-technology/add-technology.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    FileUploadComponent,
    BreadcrumbComponent,
    ImageComponent,
    AddTechnologyComponent
  ],
  imports: [
    SharedModule,
    DragDropModule
  ],
  exports: [
    FileUploadComponent,
    BreadcrumbComponent,
    ImageComponent,
    AddTechnologyComponent
  ],
})
export class ComponentsModule {}
