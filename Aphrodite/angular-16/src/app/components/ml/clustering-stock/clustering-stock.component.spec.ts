import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClusteringStockComponent } from './clustering-stock.component';

describe('ClusteringStockComponent', () => {
  let component: ClusteringStockComponent;
  let fixture: ComponentFixture<ClusteringStockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClusteringStockComponent]
    });
    fixture = TestBed.createComponent(ClusteringStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
