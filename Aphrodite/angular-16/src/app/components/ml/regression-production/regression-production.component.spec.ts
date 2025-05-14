import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegressionProductionComponent } from './regression-production.component';

describe('RegressionProductionComponent', () => {
  let component: RegressionProductionComponent;
  let fixture: ComponentFixture<RegressionProductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegressionProductionComponent]
    });
    fixture = TestBed.createComponent(RegressionProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
