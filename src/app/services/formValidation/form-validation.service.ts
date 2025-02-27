import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {
  private errorMessages: any = {
    required: 'validationRequired',
    minlength: 'validationMinLength',
    email: 'validationEmail',
    pattern: 'validationPattern'
  };
  constructor( private translate: TranslateService) { }

  getErrorMessage(control: AbstractControl):  Observable<string>  {
    if (!control.errors) return of('');
    const errorKey = Object.keys(control.errors)[0];
    const key = this.errorMessages[errorKey] || 'Error desconocido';
    return this.translate.get(key).pipe(
      map((translatedError) => translatedError || 'Error desconocido')
    );

  }

}
