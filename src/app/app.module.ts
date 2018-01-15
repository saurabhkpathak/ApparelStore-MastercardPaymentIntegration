import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material';

import { AppComponent } from './app.component';
import { ChildComponentComponent } from './child-component/child-component.component';
import { CategoryLandingComponent } from './category-landing/category-landing.component';

const appRoutes: Routes = [
  { path: 'crisis-center', component: ChildComponentComponent },
  { path: 'category/:categoryName', component: CategoryLandingComponent },
  {
    path: 'heroes',
    component: ChildComponentComponent,
    data: { title: 'Heroes List' }
  },
  {
    path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: ChildComponentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ChildComponentComponent,
    CategoryLandingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
