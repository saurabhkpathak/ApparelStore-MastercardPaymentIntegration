import { Component, OnInit } from '@angular/core';
import { Apparel } from '../apparel';
import { forEach } from '@angular/router/src/utils/collection';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { WindowRef } from '../window-ref';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-category-landing',
  templateUrl: './category-landing.component.html',
  styleUrls: ['./category-landing.component.css'],
  providers: [WindowRef]
})
export class CategoryLandingComponent implements OnInit {
  apparels: Apparel[];
  routeName: any;
  SimplifyCommerce: any;
  constructor(private route: ActivatedRoute, private http: Http,
    private winRef: WindowRef, private changeRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.apparels = [];
    this.SimplifyCommerce = this.winRef.nativeWindow.SimplifyCommerce;
    this.routeName = this.route.snapshot.paramMap.get('categoryName');
    this.populateApparels();
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

  getPublicKey() {
    return this.http.get('http://localhost:8080?type=key')
      .map(res => res.json());
  }

  finishPayment(data) {
    this.http.get('http://localhost:8080?type=payment&id=' + data.id)
      .map(res => res.json())
      .subscribe((res) => {
        this.routeName = res.paymentStatus;
        this.changeRef.detectChanges();
      });
  }

  populateApparels() {
    let newApparel: Apparel;
    for (let i = 0; i < 8; i++) {
      newApparel = new Apparel();
      newApparel.price = 10;
      newApparel.quantity = [1, 2, 3, 4, 5];
      newApparel.sizes = ['S', 'M', 'L'];
      newApparel.title = `Shirt` + i;
      newApparel.imageUrl = 'assets/images/' + this.routeName + '/' + (i + 1) + '.jpg';
      this.apparels.push(newApparel);
    }
  }

}
