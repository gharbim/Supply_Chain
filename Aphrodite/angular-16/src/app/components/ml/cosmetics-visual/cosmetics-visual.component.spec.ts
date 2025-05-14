import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CosmeticsVisualComponent } from './cosmetics-visual.component';

describe('CosmeticsVisualComponent', () => {
  let component: CosmeticsVisualComponent;
  let fixture: ComponentFixture<CosmeticsVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CosmeticsVisualComponent]
    });
    fixture = TestBed.createComponent(CosmeticsVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
