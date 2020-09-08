import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseComplaintsComponent } from './raise-complaints.component';

describe('RaiseComplaintsComponent', () => {
  let component: RaiseComplaintsComponent;
  let fixture: ComponentFixture<RaiseComplaintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaiseComplaintsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaiseComplaintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
