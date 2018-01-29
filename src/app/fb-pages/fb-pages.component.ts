import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { WindowRef } from '../window-ref';

@Component({
  selector: 'app-fb-pages',
  templateUrl: './fb-pages.component.html',
  styleUrls: ['./fb-pages.component.scss'],
  providers: [WindowRef]
})
export class FbPagesComponent implements OnInit {
  pages: any[];
  access_token: string;
  status: string[] = [];

  constructor(private http: Http, private winRef: WindowRef) { }

  ngOnInit() {
    this.status.push('Not Started');
    this.pages = [];
    this.winRef.nativeWindow.FB.Event.subscribe('auth.login', this.ifLoggedInGetPages.bind(this));
  }
  initializeFB() {
    this.status.push('Initializing FB');
    this.winRef.nativeWindow.FB.init({
      appId: '920918224737989',
      status: true,
      cookie: true,
      xfbml: true,
      version: 'v2.11'
    });
  }
  loginUser(data) {
    this.status.push('User not logged in, calling Login');
    this.winRef.nativeWindow.FB.login();
  }
  getPageList() {
    this.initializeFB();
    this.status.push('Checking Log in status');
    this.winRef.nativeWindow.FB.getLoginStatus(this.ifLoggedInGetPages.bind(this));
  }
  ifLoggedInGetPages(response) {
    if (response.status === 'connected') {
      this.status.push('User already logged in');
      this.access_token = response.authResponse.accessToken;
      this.status.push('Access token set');
      this.getFbPages();
    } else {
      this.loginUser(response);
    }
  }
  getFbPages() {
    this.status.push('Making API call to get page list');
    this.http.get('https://graph.facebook.com/v2.11/me/accounts?' +
    'access_token=' + this.access_token)
      .map(res => res.json())
      .subscribe((res) => {
        this.status.push('Got the list');
        this.pages = res.data;
      });
  }

}
