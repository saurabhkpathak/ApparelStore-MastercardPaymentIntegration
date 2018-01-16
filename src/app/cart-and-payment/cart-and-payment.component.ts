import { Component, OnInit } from '@angular/core';
import { WindowRef } from '../window-ref';
import { Apparel } from '../apparel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-cart-and-payment',
  templateUrl: './cart-and-payment.component.html',
  styleUrls: ['./cart-and-payment.component.scss'],
  providers: [WindowRef]
})
export class CartAndPaymentComponent implements OnInit {
  cartItems: Apparel[];
  SimplifyCommerce: any;

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  constructor(private winRef: WindowRef, private _formBuilder: FormBuilder,
    private changeRef: ChangeDetectorRef, private http: Http) { }

  ngOnInit() {
    this.cartItems = JSON.parse(this.winRef.nativeWindow.localStorage.getItem('cart'));
    this.SimplifyCommerce = this.winRef.nativeWindow.SimplifyCommerce;

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  }

  makePayment() {
    this.generateTokenAndFinishPayment();
  }

  generateTokenAndFinishPayment() {
    this.getPublicKey()
    .subscribe((res) => {
      this.SimplifyCommerce.generateToken({
        key: res.publicKey,
        card: {
            number: '5555555555554444',
            cvc: '123',
            expMonth: '02',
            expYear: '24'
        }
      }, this.finishPayment.bind(this));
    });
  }

  finishPayment(data) {
    this.http.get('http://localhost:8080?type=payment&id=' + data.id)
      .map(res => res.json())
      .subscribe((res) => {
        // this.routeName = res.paymentStatus;
        this.changeRef.detectChanges();
      });
  }

  getPublicKey() {
    return this.http.get('http://localhost:8080?type=key')
      .map(res => res.json());
  }
}
