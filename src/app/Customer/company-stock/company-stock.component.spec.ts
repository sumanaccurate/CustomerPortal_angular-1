import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStockComponent } from './company-stock.component';

describe('CompanyStockComponent', () => {
  let component: CompanyStockComponent;
  let fixture: ComponentFixture<CompanyStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
