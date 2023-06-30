import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryDTO } from '@core/models/website/category.model';

import { DialogData } from '@core/models/website/dialog.model';
import { SkillDTO } from '@core/models/website/skill.model';
import { TechnologyDTO } from '@core/models/website/technology.model';
import { CategoryService } from '@core/service/website/category.service';
import { SkillService } from '@core/service/website/skill.service';
import { TechnologyService } from '@core/service/website/technology.service';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-skill-form',
  templateUrl: './skill-form.component.html',
  styleUrls: ['./skill-form.component.scss']
})
export class SkillFormComponent implements OnInit {

  action: string;
  dialogTitle: string;
  skillForm: UntypedFormGroup;
  skill: SkillDTO;
  technologies: TechnologyDTO[];
  categories: CategoryDTO[];
  formControl = new UntypedFormControl('', [Validators.required,]);

  constructor(public dialogRef: MatDialogRef<SkillFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData<SkillDTO>,
              private fb: UntypedFormBuilder,
              private skillService: SkillService,
              private technologyService: TechnologyService,
              private categoryService: CategoryService) {
    // Set the defaults
    this.technologies = [];
    this.categories = [];
    this.action = data.action;
    if (this.action === 'edit') {
      this.skill = { ... data.object };
      this.dialogTitle = `${this.skill.name} ${this.skill.category.name}`;
    } else {
      this.dialogTitle = 'Crear categoría';
      this.skill = {} as SkillDTO;
    }
    this.skillForm = this.createContactForm();
  }

  ngOnInit(): void {
    this.loadLists().subscribe();
  }

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : '';
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.skill.id],
      name: [this.skill.name],
      show: [this.skill.show, [Validators.required]],
      percentage: [this.skill.percentage],
      cssClass: [this.skill.cssClass],
      cssStyle: [this.skill.cssStyle],
      technology: [this.skill.technology],
      category: [this.skill.category, [Validators.required]],
    });
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public confirmAdd(): void {
    this.skillService.save(this.skillForm.getRawValue()).subscribe((data) => {
      console.log(data);
    });
  }

  private loadLists(): Observable<any>  {
    return this.technologyService.getAll().pipe(
      switchMap((technologies: TechnologyDTO[]) => {
        this.technologies = technologies;
        return this.categoryService.getAll();
      })
    ).pipe(
      switchMap((categories: CategoryDTO[]) => {
        this.categories = categories;
        return of();
      })
    );
  }

}

