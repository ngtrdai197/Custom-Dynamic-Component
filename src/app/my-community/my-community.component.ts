import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-my-community',
  templateUrl: './my-community.component.html',
  styleUrls: ['./my-community.component.scss']
})
export class MyCommunityComponent implements OnInit {
  @Input() name: string;
  @Output() nameChange = new EventEmitter<string>()

  constructor() { }

  ngOnInit(): void {
  }

}
