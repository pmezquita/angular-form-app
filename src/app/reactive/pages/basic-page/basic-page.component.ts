import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

// const rtx5090 = {
//   name: 'RTX5090',
//   price: 2500,
//   inStorage: 2,
// }

@Component({
  templateUrl: './basic-page.component.html',
  styles: []
})
export class BasicPageComponent implements OnInit {

  // myForm: FormGroup = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    price: [0, [Validators.required, Validators.min(0)]],
    inStorage: [0, [Validators.required, Validators.min(0)]],
  });


  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    // this.myForm.reset(rtx5090);
  }

  isValidField = (field: string): boolean => this.myForm.controls[field].invalid && this.myForm.touched;

  getFieldError = (field: string): string | null => {
    if (!this.myForm.controls[field] && !this.myForm.controls[field].errors) return null;

    const errors = this.myForm.controls[field].errors!;

    for (const key of Object.keys(errors)) {
      console.log(key);
      switch (key) {
        case 'required':
          return 'Este campo es requerido';

        case 'minlength':
          return `Mínimo ${errors[key].requiredLength} caracteres`;
      }
    }

    return null;
  }

  onSave = (): void => {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.valid);
    this.myForm.reset({price: 0, inStorage: 0});
  }
}
