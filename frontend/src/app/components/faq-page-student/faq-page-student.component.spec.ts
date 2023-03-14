import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqPageStudentComponent } from './faq-page-student.component';

describe('FaqPageStudentComponent', () => {
  let component: FaqPageStudentComponent;
  let fixture: ComponentFixture<FaqPageStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqPageStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqPageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
