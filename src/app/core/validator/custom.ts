import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static validate(minDateControl: AbstractControl | undefined | null): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (minDateControl) {
        const startDate = minDateControl.value;
        const endDate = control.value;

        if (startDate && endDate && endDate < startDate) {
          return { minDate: true };
        }
      }
      return null;
    };
  }

}
