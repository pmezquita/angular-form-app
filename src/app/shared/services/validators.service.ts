import {Injectable} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  static firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  static emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  cantBeStrider = (control: FormControl): ValidationErrors | null => {

    const value = control.value.trim().toLowerCase();

    if (value === 'strider') {
      return {
        noStrider: true,
      }
    }

    return null;
  }

  isValidField = (form: FormGroup, field: string) => form.controls[field].invalid && form.touched;
}
