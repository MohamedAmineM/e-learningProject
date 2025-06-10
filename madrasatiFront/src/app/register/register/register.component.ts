import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hide:any=true;


  constructor(private router: Router,
    public registerService: RegisterService){

  }


  signup(username:any,email:any,password:any){


    this.registerService.register(username,email,password);
  }

  goToLogin(){

    this.router.navigate(['/login'])
  }
}
