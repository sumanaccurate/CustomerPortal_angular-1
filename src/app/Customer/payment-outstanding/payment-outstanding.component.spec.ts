import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentOutstandingComponent } from './payment-outstanding.component';

describe('PaymentOutstandingComponent', () => {
  let component: PaymentOutstandingComponent;
  let fixture: ComponentFixture<PaymentOutstandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentOutstandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentOutstandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
