import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';

interface child {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrl: './board-admin.component.css'
})



export class BoardAdminComponent implements OnInit {
  option:any;
  series:any;

  childs: child[] = [
    {value: 'ahmed,', viewValue: 'Ahmed'},
    {value: 'zaineb', viewValue: 'Zaineb'},
    {value: 'ayoub', viewValue: 'Ayoub'},
  ];
  constructor(public appService: AppService){

  }
  
  selectedChild = this.childs[0].value;

  selectChild(event: any) {
    this.selectedChild = event;
    this.createOption(this.selectedChild)
  }

  ngOnInit(): void {
    
    this.createOption(this.selectedChild)
    
  }

  createOption(selectChild:any):void{
    this.series = [];
    if(selectChild.toUpperCase() === 'AHMED'){

      this.series = [{
        data: [7, 4, 6, 5, 3, 2, 0],
        type: 'line'
      }]
    }else if(selectChild.toUpperCase() ==='ZAINEB'){
      this.series = [{
        data: [5, 2, 5, 1, 4, 6, 3],
        type: 'line'
      }]
    }else{
      this.series = [{
        data: [2, 2, 2, 3, 1, 4, 3],
        type: 'line'
      }]
    }

    this.option = {
      xAxis: {
        type: 'category',
        name: '/jour',
        data: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']
      },
      yAxis: {
        type: 'value',
        name: 'Nombre d\'activités'
      },
      series: this.series
    };
  }

}
