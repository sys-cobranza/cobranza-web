import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'cobro-ui',
  templateUrl: './ui.component.html',
  styleUrls: ['./ui.component.scss']
})
export class UiComponent implements OnInit {

  constructor(private renderer: Renderer2) { 
    this.renderer.removeClass(document.body.parentElement, 'login-pf');
  }

  ngOnInit() {
  }

}
