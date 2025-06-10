import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import { Observable, merge } from 'rxjs';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { StorageServiceService } from '../../services/storage.service.service';
import { AuthServiceService } from '../../services/auth.service.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  hide:any=true;
  myControl = new FormControl();

  email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = '';
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];

  constructor(public loginService: LoginService,
    public appService: AppService,
    private router: Router,
    public toastr: ToastrService,
    public authService: AuthServiceService,
    public storageService: StorageServiceService
  ) {
    
  }
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      //this.roles = this.storageService.getUser().roles;
    }
  }


  connect(emailinput:string , passwordinput: string): void{
   
     this.authService.login(emailinput, passwordinput).subscribe((data:any)=>{
      this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        


      let parts: String[] = [] = data.roles[0].split("_");
      this.appService.profileConnected  = parts[1]; 
      
      




        this.toastr.success( 'Bienvenue sur Madrasati Application');
        this.router.navigate(['/home']);
  
     });
  }

  goToSignUp(){
    this.router.navigate(['/register'])
  }
}

