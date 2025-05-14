import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationProductionComponent } from './recommendation-production.component';

describe('RecommendationProductionComponent', () => {
  let component: RecommendationProductionComponent;
  let fixture: ComponentFixture<RecommendationProductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationProductionComponent]
    });
    fixture = TestBed.createComponent(RecommendationProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
