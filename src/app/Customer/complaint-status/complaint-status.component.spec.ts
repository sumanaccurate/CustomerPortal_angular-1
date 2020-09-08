import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintStatusComponent } from './complaint-status.component';

describe('ComplaintStatusComponent', () => {
  let component: ComplaintStatusComponent;
  let fixture: ComponentFixture<ComplaintStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComplaintStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComplaintStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
