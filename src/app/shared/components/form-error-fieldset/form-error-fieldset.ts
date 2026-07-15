import { Component, inject, input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormUtils } from '../../../utils/form-utils';

@Component({
  selector: 'form-error-fieldset',
  imports: [],
  templateUrl: './form-error-fieldset.html',
})
export class FormErrorFieldset {
  control = input.required<AbstractControl>();
  
  get errorMessage(){
    const errors: ValidationErrors = this.control().errors || {};

    return this.control().touched && Object.keys(errors).length > 0
    ? FormUtils.getTextError(errors)
    : null;
  }
 }
