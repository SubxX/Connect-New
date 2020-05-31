import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Subject } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
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
export class LoaderComponent implements OnInit {

  isLoading: Subject<boolean> = this.api.loaderState;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
  }

}
