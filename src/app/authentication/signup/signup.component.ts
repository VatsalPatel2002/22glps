import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  hide = true;

  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

  signupform = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[0-9]+$')]),
    confirmpassword: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[0-9]+$')])
  })


  onSignUp() {
    console.log(this.signupform.value);

    // this.signupsvc.addSignUp(this.signupform.value);
    this.formRef.resetForm();
    // this.router.navigate(['/login']);
  }

}
