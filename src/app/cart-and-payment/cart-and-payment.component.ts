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
  paymentStatus: string;

  constructor(private winRef: WindowRef, private _formBuilder: FormBuilder,
    private changeRef: ChangeDetectorRef, private http: Http) { }

  ngOnInit() {
    this.cartItems = JSON.parse(this.winRef.nativeWindow.localStorage.getItem('cart'));
    this.SimplifyCommerce = this.winRef.nativeWindow.SimplifyCommerce;
    this.paymentStatus = '';

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
    const cardDetails = {
      number: this.firstFormGroup.value.firstCtrl,
      cvc: this.fourthFormGroup.value.fourthCtrl,
      expMonth: this.secondFormGroup.value.secondCtrl,
      expYear: this.thirdFormGroup.value.thirdCtrl
    };
    this.getPublicKey()
    .subscribe((res) => {
      this.SimplifyCommerce.generateToken({
        key: res.publicKey,
        card: cardDetails
      }, this.finishPayment.bind(this));
    });
  }

  finishPayment(data) {
    let sum = 0;
    this.cartItems.map((item) => {
      sum += item.selectedQuantity * item.price;
    });
    this.http.get('http://localhost:8080?type=payment&id=' + data.id + '&amount=' + sum)
      .map(res => res.json())
      .subscribe((res) => {
        debugger;
        this.paymentStatus = 'Approved Payment';
        this.changeRef.detectChanges();
      });
  }

  getPublicKey() {
    return this.http.get('http://localhost:8080?type=key')
      .map(res => res.json());
  }

  clearCart() {
    this.winRef.nativeWindow.localStorage.setItem('cart', null);
  }
}
