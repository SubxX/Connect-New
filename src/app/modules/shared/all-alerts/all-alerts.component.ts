import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-all-alerts',
  templateUrl: './all-alerts.component.html',
  styleUrls: ['./all-alerts.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate(500, style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class AllAlertsComponent implements OnInit, OnChanges {
  @Input() type: string;
  @Input() isShown: boolean;
  @Output() closeClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {

  }
  ngOnChanges() {

  }

  closeAlert() {
    this.closeClick.emit('');
  }
}
