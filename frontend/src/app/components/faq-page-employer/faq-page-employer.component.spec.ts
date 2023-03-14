import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqPageEmployerComponent } from './faq-page-employer.component';

describe('FaqPageEmployerComponent', () => {
  let component: FaqPageEmployerComponent;
  let fixture: ComponentFixture<FaqPageEmployerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaqPageEmployerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaqPageEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
