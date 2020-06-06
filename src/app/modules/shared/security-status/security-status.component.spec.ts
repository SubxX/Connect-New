import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityStatusComponent } from './security-status.component';

describe('SecurityStatusComponent', () => {
  let component: SecurityStatusComponent;
  let fixture: ComponentFixture<SecurityStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
