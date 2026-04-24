import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  private activatedModuleName = new BehaviorSubject<string>(''); // Initialize with null or any default value
  data$ = this.activatedModuleName.asObservable();
}
export function twoDecimalValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (value && !/^\d+(\.\d{0,2})?$/.test(value)) {
      return { invalidDecimal: true };
    }
    return null;
  };
}
