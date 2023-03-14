import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageStudentComponent } from './register-page-student.component';

describe('RegisterPageStudentComponent', () => {
  let component: RegisterPageStudentComponent;
  let fixture: ComponentFixture<RegisterPageStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPageStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPageStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
