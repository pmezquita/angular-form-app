import {Component} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Metal Gear', [Validators.required]],
      ['Death Stranding', [Validators.required]],
    ]),
  });

  newFavorite: FormControl = new FormControl('', [Validators.required]);

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

  constructor(private fb: FormBuilder) {
  }

  isValidField = (field: string): boolean => this.myForm.controls[field].invalid && this.myForm.touched;

  isValidFieldInArray = (formArray: FormArray, index: number) =>
    formArray.controls[index].invalid && formArray.controls[index].touched;

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

  onAddFavorites = () => {
    if (this.newFavorite.invalid) return;

    const newGame = this.newFavorite.value;

    this.favoriteGames.push(
      this.fb.control(newGame, [Validators.required])
    );
    this.newFavorite.reset();
  }

  onDeleteFavorite = (index: number): void => {
    this.favoriteGames.removeAt(index);
  }

  onSubmit = (): void => {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([]);
    this.myForm.reset();
  }

}
