import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryLandingComponent } from './category-landing.component';

describe('CategoryLandingComponent', () => {
  let component: CategoryLandingComponent;
  let fixture: ComponentFixture<CategoryLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
