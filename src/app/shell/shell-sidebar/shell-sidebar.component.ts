import { Component, OnInit } from '@angular/core';
import { NavigationItemConfig } from 'patternfly-ng';

@Component({
  selector: 'cobro-shell-sidebar',
  templateUrl: './shell-sidebar.component.html',
  styleUrls: ['./shell-sidebar.component.scss']
})
export class ShellSidebarComponent implements OnInit {


  navigationItems: NavigationItemConfig[] = [
    { title: 'Dashboard', iconStyleClass: 'fa fa-dashboard', url: '/app/home' },
    { title: 'Producto', iconStyleClass: 'fa fa-product-hunt', url: '/app/producto' },
    { title: 'Cobranza', iconStyleClass: 'fa fa-usd', url: '/app/cobranza' },
    { title: 'Clientes', iconStyleClass: 'fa fa-users', url: '/app/persona' },
    { title: 'Usuarios', iconStyleClass: 'fa fa-user-circle', url: '/app/usuario' }
  ];

  constructor() {
  }

  ngOnInit() {

  }
}
