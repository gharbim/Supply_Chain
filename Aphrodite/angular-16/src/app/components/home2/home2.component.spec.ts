import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent2 } from './home2.component';

describe('HomeComponent', () => {
  let component: HomeComponent2;
  let fixture: ComponentFixture<HomeComponent2>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent2]
    });
    fixture = TestBed.createComponent(HomeComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
