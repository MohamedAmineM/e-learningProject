import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { AppService } from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  sideBarOpen = false;
  title = 'Madrasati';

  constructor(private router: Router,public loginService: LoginService, public appService: AppService
    ) {

      

    }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  goToScreen(screen: string) : void{
    this.router.navigate([screen]);
    this.sideBarOpen = !this.sideBarOpen;
  }

  logout(){

    if(confirm("Do you really want to log out?"))
    this.loginService.logout();
  }
}
