import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cobro-shell-footer',
  templateUrl: './shell-footer.component.html',
  styleUrls: ['./shell-footer.component.scss']
})
export class ShellFooterComponent implements OnInit {
 
  today: number = Date.now();
  
  constructor() { }

  ngOnInit() {
  }

}
