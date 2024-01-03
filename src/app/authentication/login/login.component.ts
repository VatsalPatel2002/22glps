import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;

  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  loginform = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(private loginsvc: LoginService, private router:Router) { }

  onLogin() {
    // console.log(this.loginform.value);
    this.loginsvc.addLogin(this.loginform.value)
      .subscribe((response) => {
        console.log(response.msg);

        if (response.msg == "Login Successfull.") {
          localStorage.setItem('form-data', JSON.stringify(this.loginform.value));
          this.router.navigate(['/dashboard'])
          this.formRef.resetForm();
        } else {
          alert("password not matched")
        }

      });
  }

}
