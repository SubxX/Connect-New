import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() msg: any;
  @Input() currentUser: any;
  @Input() receiverUser: any;


  constructor() { }

  ngOnInit(): void {
  }

}
