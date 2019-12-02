import { Component, OnInit } from '@angular/core';
import { MessageHistory } from '../../core/model/message-history';
import { MessageService } from '../../core/data/message.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/core/data/data.service';

@Component({
  selector: 'cobro-shell-header',
  templateUrl: './shell-header.component.html',
  styleUrls: ['./shell-header.component.scss']
})
export class ShellHeaderComponent implements OnInit {
  messageHistory: MessageHistory[];
  constructor(public message: MessageService, private data: DataService, private router: Router) { }

  ngOnInit() {
    this.messageHistory = this.message.getHistory();
  }
  clear() {
    this.message.clear();
  }

  logout() {
    this.data.usuarios().removeItem();
    this.router.navigate(['/app/login']);
  }

  security() {

  }
}
