import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProfilePopupComponent } from './create-profile-popup.component';

describe('CreateProfilePopupComponent', () => {
  let component: CreateProfilePopupComponent;
  let fixture: ComponentFixture<CreateProfilePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProfilePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProfilePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
