import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityTwofaComponent } from './security-twofa.component';

describe('SecurityTwofaComponent', () => {
  let component: SecurityTwofaComponent;
  let fixture: ComponentFixture<SecurityTwofaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityTwofaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityTwofaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
