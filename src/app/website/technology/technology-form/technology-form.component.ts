import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogData } from '@core/models/website/dialog.model';
import { TechnologyDTO } from '@core/models/website/technology.model';
import { TechnologyService } from '@core/service/website/technology.service';

@Component({
  selector: 'app-technology-form',
  templateUrl: './technology-form.component.html',
  styleUrls: ['./technology-form.component.scss']
})
export class TechnologyFormComponent {

  action: string;
  dialogTitle: string;
  technologyForm: UntypedFormGroup;
  technology: TechnologyDTO;
  constructor(public dialogRef: MatDialogRef<TechnologyFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData<TechnologyDTO>,
              public technologyService: TechnologyService,
              private fb: UntypedFormBuilder) {
    this.action = data.action;
    if (this.action === 'edit') {
      this.technology = { ... data.object };
      this.dialogTitle = `Tecnología N°
        ${this.technology.id} - ${this.technology.name} ${this.technology.version ? this.technology.version : '' }`;
    } else {
      this.dialogTitle = 'Crear tecnología';
      this.technology = {} as TechnologyDTO;
    }
    this.technologyForm = this.createContactForm();

  }

  formControl = new UntypedFormControl('', [Validators.required]);

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.technology.id],
      name: [this.technology.name, [Validators.required, Validators.maxLength(40)]],
      version: [this.technology.version, [Validators.maxLength(40)]]
    });
  }

  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.technologyService.save(this.technologyForm.getRawValue()).subscribe((data) => {
        console.log(data);
    });
  }

}
