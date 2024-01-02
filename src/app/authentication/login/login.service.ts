import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }
  addLogin(data:any){

    console.log(data);
    return this.http.post<{msg:string}>("http://localhost:3008/glps__login22/login",data)

  }
}
