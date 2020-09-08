import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUploadUserComponent } from './customer-upload-user.component';

describe('CustomerUploadUserComponent', () => {
  let component: CustomerUploadUserComponent;
  let fixture: ComponentFixture<CustomerUploadUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerUploadUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerUploadUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
