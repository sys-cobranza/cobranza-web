import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../core/data/message.service';
import { Notification, NotificationEvent } from 'patternfly-ng';

@Component({
  selector: 'cobro-shell-notification',
  templateUrl: './shell-notification.component.html',
  styleUrls: ['./shell-notification.component.scss']
})
export class ShellNotificationComponent implements OnInit {
  notifications: Notification[];
  constructor(public message: MessageService) {
  }

  ngOnInit() {
    this.notifications = this.message.get();
  }

  close(event: NotificationEvent) {
    this.message.close(event);
  }
}
