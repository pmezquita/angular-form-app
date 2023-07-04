import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent implements OnInit {

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.myForm.reset(this.person);
  }

  person = {
    gender: 'F',
    wantNotification: false,
  }

  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotification: [true, Validators.required],
    termsAndConditions: [false, Validators.requiredTrue],
  });

  isValidField = (field: string): boolean => this.myForm.controls[field].invalid && this.myForm.touched;

  onSave = () => {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const {termsAndConditions, ...newPerson} = this.myForm.value;

    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
  };

}
