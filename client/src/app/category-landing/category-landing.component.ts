import { Component, OnInit } from '@angular/core';
import { Apparel } from '../apparel';
import { ActivatedRoute } from '@angular/router';
import { WindowRef } from '../window-ref';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-category-landing',
  templateUrl: './category-landing.component.html',
  styleUrls: ['./category-landing.component.css'],
  providers: [WindowRef]
})
export class CategoryLandingComponent implements OnInit {
  apparels: Apparel[];
  routeName: any;
  constructor(private route: ActivatedRoute, private winRef: WindowRef, public dialog: MatDialog) { }

  ngOnInit() {
    this.apparels = [];
    this.routeName = this.route.snapshot.paramMap.get('categoryName');
    this.populateApparels();
  }

  populateApparels() {
    let newApparel: Apparel;
    for (let i = 0; i < 8; i++) {
      newApparel = new Apparel();
      newApparel.price = 10;
      newApparel.quantity = [1, 2, 3, 4, 5];
      newApparel.sizes = ['S', 'M', 'L'];
      newApparel.title = this.routeName + ' ' + i;
      newApparel.imageUrl = 'assets/images/' + this.routeName + '/' + (i + 1) + '.jpg';
      this.apparels.push(newApparel);
    }
  }

  openDialog(product) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50%',
      data: { imgUrl: product.imageUrl }
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
    });
  }

  addToCart(product) {
    // tslint:disable-next-line:prefer-const
    let cart = JSON.parse(this.winRef.nativeWindow.localStorage.getItem('cart'));
    if (!cart) {
      // tslint:disable-next-line:prefer-const
      let itemList = [];
      itemList.push(product);
      this.winRef.nativeWindow.localStorage.setItem('cart', JSON.stringify(itemList));
    } else {
      cart.push(product);
      this.winRef.nativeWindow.localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

}
