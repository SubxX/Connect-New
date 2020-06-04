import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftFooterActionsComponent } from './left-footer-actions.component';

describe('LeftFooterActionsComponent', () => {
  let component: LeftFooterActionsComponent;
  let fixture: ComponentFixture<LeftFooterActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftFooterActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftFooterActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
