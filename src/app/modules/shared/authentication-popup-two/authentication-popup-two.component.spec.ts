import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationPopupTwoComponent } from './authentication-popup-two.component';

describe('AuthenticationPopupTwoComponent', () => {
  let component: AuthenticationPopupTwoComponent;
  let fixture: ComponentFixture<AuthenticationPopupTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationPopupTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationPopupTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
