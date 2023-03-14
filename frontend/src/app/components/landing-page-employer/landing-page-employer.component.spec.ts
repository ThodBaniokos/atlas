import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageEmployerComponent } from './landing-page-employer.component';

describe('LandingPageEmployerComponent', () => {
  let component: LandingPageEmployerComponent;
  let fixture: ComponentFixture<LandingPageEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingPageEmployerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
