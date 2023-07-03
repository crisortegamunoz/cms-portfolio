import { Component, Inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  showPdf: boolean;
  pdfUrl: SafeResourceUrl | null;
  url: string;


  constructor(public dialogRef: MatDialogRef<ImageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer) {
    this.showPdf = data.showPdf;
    this.url = data.url;
    this.pdfUrl = this.showPdf ? this.sanitizer.bypassSecurityTrustResourceUrl(this.url) : null;
  }

}
