import { AbstractControl, ValidationErrors} from '@angular/forms';

export function dateRangeValidator(control: AbstractControl): ValidationErrors | null {

  const start = control.get('startDate');
  const end = control.get('endDate');

  if (!start?.value || !end?.value) {
    return null;
  }

  if (end?.value < start?.value) {
    end.setErrors({ invalidDateRange: true });
    return { invalidDateRange: true };
  } 

  return null;
}