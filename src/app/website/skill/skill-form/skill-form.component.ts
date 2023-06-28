import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { DialogData } from '@core/models/website/dialog.model';
import { SkillDTO } from '@core/models/website/skill.model';
import { SkillService } from '@core/service/website/skill.service';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent {

  action: string;
  dialogTitle: string;
  skillForm: UntypedFormGroup;
  skill: SkillDTO;
  constructor(public dialogRef: MatDialogRef<SkillFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData<SkillDTO>,
              public skillService: SkillService,
              private fb: UntypedFormBuilder) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.skill = { ... data.object };
      this.dialogTitle = `${this.skill.name} ${this.skill.categoryName}`;
    } else {
      this.dialogTitle = 'Crear categoría';
      this.skill = {} as SkillDTO;
    }
    this.skillForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.skill.id],
      name: [this.skill.name, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      available: [this.skill.available],
      percentage: [this.skill.percentage],
      cssClass: [this.skill.cssClass],
      cssStyle: [this.skill.cssStyle],
      technologyId: [this.skill.technologyId],
      categoryId: [this.skill.categoryId],
      //section: [this.skill.section, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.skillService.addAdvanceTable(
      this.skillForm.getRawValue()
    );
  }

}

