import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';
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
  title: string;
  appName: string;
  public client: any;

  constructor(private winRef: WindowRef) {}

  ngOnInit() {
    this.title = 'app';
    this.appName = 'Angular 4';
    this.SimplifyCommerce = this.winRef.nativeWindow.SimplifyCommerce;
    this.client = Simplify.getClient({
      publicKey: 'sbpb_N2UxMjljZDUtN2ZkNi00OGMzLWJmNmMtODRiMzU2MmU1MTM2',
      privateKey: 'fW0gV8/zgUgkkeURGVFtfTFyuyMYJB8bw/EKbyTGVud5YFFQL0ODSXAOkNtXTToq'
    });
  }

  onSubmit() {
    this.SimplifyCommerce.generateToken({
      key: this.client.cardtoken.appKeys.publicKey,
      card: {
          number: '5555555555554444',
          cvc: '123',
          expMonth: '02',
          expYear: '24'
      }
    }, this.simplifyResponseHandler);
  }

  simplifyResponseHandler(data) {
    const client = Simplify.getClient({
      publicKey: 'sbpb_N2UxMjljZDUtN2ZkNi00OGMzLWJmNmMtODRiMzU2MmU1MTM2',
      privateKey: 'fW0gV8/zgUgkkeURGVFtfTFyuyMYJB8bw/EKbyTGVud5YFFQL0ODSXAOkNtXTToq'
    });
    client.payment.create({
      amount : '1000',
      simplifyToken : data.id,
      description : 'payment description',
      currency : 'USD'
    }, (errData) => {
      debugger;
        if (errData) {
            console.error('Error Message: ' + errData.data.error.message);
            // handle the error
            return;
        }
        console.log('Payment Status: ' + data.paymentStatus);
    });
  }
}
