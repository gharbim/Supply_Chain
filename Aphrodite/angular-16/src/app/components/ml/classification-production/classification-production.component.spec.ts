import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationProductionComponent } from './classification-production.component';

describe('ClassificationProductionComponent', () => {
  let component: ClassificationProductionComponent;
  let fixture: ComponentFixture<ClassificationProductionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassificationProductionComponent]
    });
    fixture = TestBed.createComponent(ClassificationProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
