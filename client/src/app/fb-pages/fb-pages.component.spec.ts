import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbPagesComponent } from './fb-pages.component';

describe('FbPagesComponent', () => {
  let component: FbPagesComponent;
  let fixture: ComponentFixture<FbPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
