import { Component, OnInit, Input } from '@angular/core';
import { showStateTrigger } from '../../animations/animations';

@Component({
  selector: 'cobro-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  animations: [showStateTrigger]
})
export class LoadingComponent implements OnInit {

  @Input()
  loading: boolean;

  constructor() { }

  ngOnInit() {
  }

}
