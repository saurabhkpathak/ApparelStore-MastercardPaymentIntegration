import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CartAndPaymentComponent } from './cart-and-payment.component';

describe('CartAndPaymentComponent', () => {
  let component: CartAndPaymentComponent;
  let fixture: ComponentFixture<CartAndPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CartAndPaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartAndPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
