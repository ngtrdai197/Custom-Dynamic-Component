import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-options',
  templateUrl: './my-options.component.html',
  styleUrls: ['./my-options.component.scss']
})
export class MyOptionsComponent implements OnInit {
  public name = 'my-options works!'
  @Output() nameChange = new EventEmitter<string>()
  constructor() { }

  ngOnInit(): void {
  }

}
