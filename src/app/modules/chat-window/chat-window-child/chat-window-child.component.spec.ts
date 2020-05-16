import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatWindowChildComponent } from './chat-window-child.component';

describe('ChatWindowChildComponent', () => {
  let component: ChatWindowChildComponent;
  let fixture: ComponentFixture<ChatWindowChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatWindowChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatWindowChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
