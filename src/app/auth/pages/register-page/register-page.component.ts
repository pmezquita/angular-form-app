import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ValidatorsService} from "../../../shared/services/validators.service";

@Component({
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
  ) {
  }

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(ValidatorsService.firstNameAndLastnamePattern)]],
    email: ['', [Validators.required, Validators.pattern(ValidatorsService.emailPattern)]],
    username: ['', [Validators.required, this.validatorsService.cantBeStrider]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]],
  });

  isValidField = (field: string) => this.validatorsService.isValidField(this.myForm, field)

  onSubmit = () => this.myForm.markAllAsTouched();

}
