import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from '../services/auth.service.service';
import { StorageServiceService } from '../services/storage.service.service';

const AUTH_API = '/api';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
   })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  isLoggedIn = false;
  isLoginFailed = false;
  roles: string[] = [];
  constructor(private http: HttpClient,
    private router: Router,public appService: AppService,
    public toastr: ToastrService,
  public authService: AuthServiceService,
public storageService: StorageServiceService) { }

    login(username: string, password: string): void {
      const obj:any={
        username: username,
        password: password
      };

       this.http.post<any>(
        AUTH_API + '/auth/signin',
         obj      ).subscribe((data:any) => {

      this.appService.saveUser(data);
      this.isLoginFailed = false;
      this.isLoggedIn = true;
      this.roles = this.appService.getUser().roles;
    
      let parts: String[] = [] = data.roles[0].split("_");
      this.appService.profileConnected  = parts[1]; 
      console.log(this.appService.profileConnected + '111111111111')
      
      
      
      this.appService.profileConnected = data.roles[0];

      console.log(this.appService.profileConnected + '22222222222222222222')
      
    
      this.toastr.success( 'Bienvenue sur Madrasati Application');
      this.router.navigate(['/home']);
      },
      (error: any) => {this.toastr.error('Erreur d\'authentification. Vérifiez vos identifiants!','Erreur',);;}
    )
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

