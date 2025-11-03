import { Component } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear:any = '2024';
  today: Date = new Date();

  constructor(public appService:AppService){

  }
}
