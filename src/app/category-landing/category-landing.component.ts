import { Component, OnInit } from '@angular/core';
import { Apparel } from '../apparel';
import { forEach } from '@angular/router/src/utils/collection';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-landing',
  templateUrl: './category-landing.component.html',
  styleUrls: ['./category-landing.component.css']
})
export class CategoryLandingComponent implements OnInit {
  apparels: Apparel[];
  routeName: any;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.apparels = [];
    this.populateApparels();
    // this.route.params
    // .map(res => res.json())
    // .subscribe(data => this.routeName = data);
  }

  populateApparels() {
    let newApparel: Apparel;
    for (let i = 0; i < 8; i++) {
      newApparel = new Apparel();
      newApparel.price = 10;
      newApparel.quantity = 10;
      newApparel.sizes = ['S', 'M', 'L'];
      newApparel.title = `Shirt` + i;
      newApparel.imageUrl = 'assets/images/shirts/' + (i + 1) + '.jpg';
      this.apparels.push(newApparel);
    }
  }

}
