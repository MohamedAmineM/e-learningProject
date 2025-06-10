import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const AUTH_API = '/api';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
   })
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http : HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const obj:any={
      username: username,
      password: password
    };

    return this.http.post<any>(
      AUTH_API + '/auth/signin',
       obj      )
    
  
}

logout(): Observable<any> {
 return this.http.post(AUTH_API + '/auth/signout', { }, httpOptions);
}


register(username: string,email: string, password: string): Observable<any> {
  const obj:any={
    username: username,
    email: email,
    password: password
  };

  return  this.http.post<any>(
    '/api' + '/auth/signup',
     obj)
}
  
}
