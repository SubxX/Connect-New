import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftOnlineUsersComponent } from './left-online-users.component';

describe('LeftOnlineUsersComponent', () => {
  let component: LeftOnlineUsersComponent;
  let fixture: ComponentFixture<LeftOnlineUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftOnlineUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftOnlineUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
