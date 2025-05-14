import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlinearVisualComponent } from './blinear-visual.component';

describe('BlinearVisualComponent', () => {
  let component: BlinearVisualComponent;
  let fixture: ComponentFixture<BlinearVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlinearVisualComponent]
    });
    fixture = TestBed.createComponent(BlinearVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
