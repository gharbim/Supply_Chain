import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationVisualComponent } from './classification-visual.component';

describe('ClassificationVisualComponent', () => {
  let component: ClassificationVisualComponent;
  let fixture: ComponentFixture<ClassificationVisualComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassificationVisualComponent]
    });
    fixture = TestBed.createComponent(ClassificationVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
