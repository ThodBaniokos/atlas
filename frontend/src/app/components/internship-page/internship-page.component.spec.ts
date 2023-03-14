import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipPageComponent } from './internship-page.component';

describe('InternshipPageComponent', () => {
  let component: InternshipPageComponent;
  let fixture: ComponentFixture<InternshipPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternshipPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternshipPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
