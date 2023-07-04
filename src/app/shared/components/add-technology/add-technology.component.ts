import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechnologyDTO } from '@core/models/website/technology.model';
import { SwalConfig } from '@core/swal/config';

@Component({
  selector: 'app-add-technology',
  templateUrl: './add-technology.component.html',
  styleUrls: ['./add-technology.component.scss']
})
export class AddTechnologyComponent {

  @Input()
  technologies: TechnologyDTO[];

  portfolioStep2?: FormGroup;


  constructor(private formBuilder: FormBuilder) {
    this.technologies = [];
    this.portfolioStep2 = this.formBuilder.group({
      technologyList: this.formBuilder.array([this.formBuilder.control('')], Validators.required)
    });
  }


  get technologyControls() {
    return this.portfolioStep2?.get('technologyList') as FormArray;
  }

  addTechnology() {
    if (this.technologyControls.controls.some(control => control.value !== null && control.value !== '')) {
      const newTechControl = this.formBuilder.control(null);
      this.technologyControls.push(newTechControl);
    } else {
      SwalConfig.simpleModalWarning('Oops!', 'Recuerda seleccionar una tecnología antes de agregar una nueva');
    }
  }

  removeTechnology(index: number) {
    if (this.technologyControls.controls.length === 1) {
      SwalConfig.simpleModalWarning('Oops!', 'Al menos debe haber alguna tecnología seleccionada');
    } else {
      this.technologyControls.removeAt(index);
    }
  }


}
