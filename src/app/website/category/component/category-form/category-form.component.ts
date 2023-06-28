import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CategoryDTO } from '../../../../core/models/website/category.model';
import { CategoryService } from '../../../../core/service/website/category.service';
import { DialogData } from '@core/models/website/dialog.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent {

  action: string;
  dialogTitle: string;
  categoryForm: UntypedFormGroup;
  category: CategoryDTO;
  constructor(public dialogRef: MatDialogRef<CategoryFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData<CategoryDTO>,
              public categoryService: CategoryService,
              private fb: UntypedFormBuilder) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.category = { ... data.object };
      this.dialogTitle = `${this.category.name} ${this.category.section}`;
    } else {
      this.dialogTitle = 'Crear categoría';
      this.category = {} as CategoryDTO;
    }
    this.categoryForm = this.createContactForm();
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
      id: [this.category.id],
      name: [this.category.name, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]],
      section: [this.category.section, [Validators.required, Validators.minLength(5), Validators.maxLength(40)]]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public confirmAdd(): void {
    this.categoryService.addAdvanceTable(
      this.categoryForm.getRawValue()
    );
  }

}
