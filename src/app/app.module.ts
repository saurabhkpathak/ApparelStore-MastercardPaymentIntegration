import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';

import { AppComponent } from './app.component';
import { ChildComponentComponent } from './child-component/child-component.component';
import { CategoryLandingComponent } from './category-landing/category-landing.component';
import { DialogComponent } from './dialog/dialog.component';
import { CartAndPaymentComponent } from './cart-and-payment/cart-and-payment.component';

const appRoutes: Routes = [
  { path: 'category/:categoryName', component: CategoryLandingComponent },
  { path: 'payment', component: CartAndPaymentComponent},
  {
    path: '',
    redirectTo: '/payment',
    pathMatch: 'full'
  },
  { path: '**', component: CartAndPaymentComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ChildComponentComponent,
    CategoryLandingComponent,
    DialogComponent,
    CartAndPaymentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    MatExpansionModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
