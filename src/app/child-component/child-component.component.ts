import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {

  constructor() { }
  title: string;
  toggleChild: boolean;
  appName: string;

  ngOnInit() {
    this.title = 'app';
    this.toggleChild = false;
    this.appName = 'Angular 4';
  }

  toggleChildComponent() {
    this.toggleChild = !this.toggleChild;
  }

}
