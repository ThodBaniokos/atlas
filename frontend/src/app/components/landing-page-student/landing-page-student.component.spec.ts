import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageStudentComponent } from './landing-page-student.component';

describe('LandingPageStudentComponent', () => {
  let component: LandingPageStudentComponent;
  let fixture: ComponentFixture<LandingPageStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
