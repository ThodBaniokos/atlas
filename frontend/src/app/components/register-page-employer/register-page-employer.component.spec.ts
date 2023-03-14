import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPageEmployerComponent } from './register-page-employer.component';

describe('RegisterPageEmployerComponent', () => {
  let component: RegisterPageEmployerComponent;
  let fixture: ComponentFixture<RegisterPageEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterPageEmployerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPageEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
