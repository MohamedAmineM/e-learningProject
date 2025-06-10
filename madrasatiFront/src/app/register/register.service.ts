import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient,private toastr:ToastrService) { }


  register(username: string,email: string, password: string): void {
    const obj:any={
      username: username,
      email: email,
      password: password
    };

     this.http.post<any>(
      '/api' + '/auth/signup',
       obj      ).subscribe((data:any) => {

        this.toastr.success('Registration successful!', 'Success');
    },
    (error: any) => {
      this.toastr.error('Registration failed. Please try again.', 'Error');
  //    console.error('Error during login:', error);
})
}
}
