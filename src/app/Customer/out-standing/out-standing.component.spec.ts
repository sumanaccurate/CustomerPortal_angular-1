import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutStandingComponent } from './out-standing.component';

describe('OutStandingComponent', () => {
  let component: OutStandingComponent;
  let fixture: ComponentFixture<OutStandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutStandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutStandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
