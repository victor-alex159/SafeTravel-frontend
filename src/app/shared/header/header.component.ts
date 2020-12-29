import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems = [
    {
      text: 'INCIO'
    }, 
    {
      text: 'HOTEL'
    },
    {
      text: 'RESTAURANTE'
    },
    {
      text: 'SERVICIO'
    },
    {
      text: 'CONTACTO'
    },
    {
      text: 'NOSOTROS'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
