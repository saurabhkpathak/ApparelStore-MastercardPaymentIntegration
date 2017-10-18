import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
