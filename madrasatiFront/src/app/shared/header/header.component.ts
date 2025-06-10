import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Output() toggleSidebarForMe: EventEmitter<any> = new EventEmitter();

  constructor(public router: Router,public appService: AppService) {}

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }

}
