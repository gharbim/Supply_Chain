import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArriimaVisualComponent } from './arriima-visual.component';

describe('ArriimaVisualComponent', () => {
  let component: ArriimaVisualComponent;
  let fixture: ComponentFixture<ArriimaVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArriimaVisualComponent]
    });
    fixture = TestBed.createComponent(ArriimaVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
