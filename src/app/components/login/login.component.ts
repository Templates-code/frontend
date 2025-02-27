import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from 'src/app/services/formValidation/form-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  hiddenPwd:boolean = false;
  loginForm: FormGroup = new FormGroup({
    user: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(public formValidation: FormValidationService, ){
  }

  ngOnInit(){
    console.log("init");
    throw new Error('Error forzado para probar el ErrorHandler');
  }
}
