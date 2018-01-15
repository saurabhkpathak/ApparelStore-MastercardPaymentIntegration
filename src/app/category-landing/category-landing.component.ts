import { Component, OnInit } from '@angular/core';
import { Apparel } from '../apparel';
import { forEach } from '@angular/router/src/utils/collection';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-category-landing',
  templateUrl: './category-landing.component.html',
  styleUrls: ['./category-landing.component.css']
})
export class CategoryLandingComponent implements OnInit {
  apparels: Apparel[];
  routeName: any;
  constructor(private route: ActivatedRoute, private http: Http) { }

  ngOnInit() {
    this.apparels = [];
    this.routeName = this.route.snapshot.paramMap.get('categoryName');
    this.populateApparels();
    this.http.get('http://localhost:8080/').map(res => res.json()).subscribe(data => this.routeName = data.name);
  }

  populateApparels() {
    let newApparel: Apparel;
    for (let i = 0; i < 8; i++) {
      newApparel = new Apparel();
      newApparel.price = 10;
      newApparel.quantity = 10;
      newApparel.sizes = ['S', 'M', 'L'];
      newApparel.title = `Shirt` + i;
      newApparel.imageUrl = 'assets/images/' + this.routeName + '/' + (i + 1) + '.jpg';
      this.apparels.push(newApparel);
    }
  }

}
