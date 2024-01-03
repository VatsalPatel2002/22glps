import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  
  constructor() { }

  addSignUp(data:any){
    console.log(data);
    
  }
}
