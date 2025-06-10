import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router, RouterModule } from '@angular/router';
import { StorageServiceService } from './services/storage.service.service';
import { AuthServiceService } from './services/auth.service.service';
const USER_KEY = 'auth-user';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
        private roles: string[] = [];
        isLoggedIn = false;
        showAdminBoard = false;
        showModeratorBoard = false;
        username?: string;
      
      
        constructor(
          private storageService: StorageServiceService,
          private authService: AuthServiceService,
          private router: Router,
          private appService: AppService
        ) {}
      
        ngOnInit(): void {
          this.isLoggedIn = this.storageService.isLoggedIn();
      
          if (this.isLoggedIn) {
            const user = this.storageService.getUser();
            this.roles = user.roles;
    
        


            let parts: String[] = [] = this.roles[0].split("_");
            this.appService.profileConnected  = parts[1]; 
          }else{
            this.router.navigate(['/login'])
          }
      

        }
      
        logout(): void {
          this.authService.logout().subscribe({
            next: res => {
              console.log(res);
              this.storageService.clean();
      
              this.router.navigate(['/login'])
            },
            error: err => {
              console.log(err);
            }
          });
        }
      }