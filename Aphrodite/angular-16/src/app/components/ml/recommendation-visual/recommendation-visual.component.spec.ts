import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationVisualComponent } from './recommendation-visual.component';

describe('RecommendationVisualComponent', () => {
  let component: RecommendationVisualComponent;
  let fixture: ComponentFixture<RecommendationVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecommendationVisualComponent]
    });
    fixture = TestBed.createComponent(RecommendationVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
