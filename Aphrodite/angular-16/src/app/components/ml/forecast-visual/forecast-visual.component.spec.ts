import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastVisualComponent } from './forecast-visual.component';

describe('ForecastVisualComponent', () => {
  let component: ForecastVisualComponent;
  let fixture: ComponentFixture<ForecastVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForecastVisualComponent]
    });
    fixture = TestBed.createComponent(ForecastVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
