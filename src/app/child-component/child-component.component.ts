import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map'
import { Post } from '../post';
@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css']
})
export class ChildComponentComponent implements OnInit {

  constructor(private http: Http) { }
  title: string;
  toggleChild: boolean;
  appName: string;
  posts: Post[];

  ngOnInit() {
    this.title = 'app';
    this.toggleChild = false;
    this.appName = 'Angular 4';
    this.http.get('https://jsonplaceholder.typicode.com/posts')
    .map(res => res.json())
    .subscribe(posts => this.posts = posts);
  }

  toggleChildComponent() {
    this.toggleChild = !this.toggleChild;
  }

}
