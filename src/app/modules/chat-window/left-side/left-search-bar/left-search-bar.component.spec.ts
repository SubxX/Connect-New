import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftSearchBarComponent } from './left-search-bar.component';

describe('LeftSearchBarComponent', () => {
  let component: LeftSearchBarComponent;
  let fixture: ComponentFixture<LeftSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
