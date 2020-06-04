import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-errors',
  templateUrl: './input-errors.component.html',
  styleUrls: ['./input-errors.component.css']
})
export class InputErrorsComponent implements OnInit {
  @Input() control: FormControl;
  constructor() { }

  ngOnInit(): void {
    console.log(this.control);
  }

}
