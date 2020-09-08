import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustLedgerStatusComponent } from './cust-ledger-status.component';

describe('CustLedgerStatusComponent', () => {
  let component: CustLedgerStatusComponent;
  let fixture: ComponentFixture<CustLedgerStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustLedgerStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustLedgerStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
