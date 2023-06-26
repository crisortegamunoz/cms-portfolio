import { Component, OnInit, Output, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from '@core/models/website/dialog.model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  @Output() id: string | null;

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData<string>
  ) {
    this.id = null;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    //
    //this.advanceTableService.deleteAdvanceTable(this.data.id);
  }

}
