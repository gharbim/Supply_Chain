import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegressionVisualComponent } from './regression-visual.component';

describe('RegressionVisualComponent', () => {
  let component: RegressionVisualComponent;
  let fixture: ComponentFixture<RegressionVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegressionVisualComponent]
    });
    fixture = TestBed.createComponent(RegressionVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
