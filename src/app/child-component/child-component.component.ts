import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Post } from '../post';
import * as Simplify from 'simplify-commerce';
import { WindowRef } from '../window-ref';
@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.css'],
  providers: [WindowRef]
})
export class ChildComponentComponent implements OnInit {
  SimplifyCommerce: any;
  constructor(private http: Http, winRef: WindowRef) {
    this.SimplifyCommerce = winRef.nativeWindow.SimplifyCommerce;
  }
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

    const client = Simplify.getClient({
      publicKey: 'sbpb_N2UxMjljZDUtN2ZkNi00OGMzLWJmNmMtODRiMzU2MmU1MTM2',
      privateKey: 'fW0gV8/zgUgkkeURGVFtfTFyuyMYJB8bw/EKbyTGVud5YFFQL0ODSXAOkNtXTToq'
    });
    this.SimplifyCommerce.generateToken({
      key: client.cardtoken.appKeys.publicKey,
      card: {
          number: '5555555555554444',
          cvc: '123',
          expMonth: '02',
          expYear: '24'
      }
    }, function(data, status) {
      debugger;
    });
    // client.payment.create({
    //     amount : '1000',
    //     token : 'f21da65e-f0ab-45cb-b8e6-40b493c3671f',
    //     description : 'payment description',
    //     currency : 'USD'
    // }, function(errData, data){
    //     if (errData) {
    //         console.error('Error Message: ' + errData.data.error.message);
    //         // handle the error
    //         return;
    //     }
    //     console.log('Payment Status: ' + data.paymentStatus);
    // });
  }

  toggleChildComponent() {
    this.toggleChild = !this.toggleChild;
  }

}
