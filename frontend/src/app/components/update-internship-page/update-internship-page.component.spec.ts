import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInternshipPageComponent } from './update-internship-page.component';

describe('UpdateInternshipPageComponent', () => {
  let component: UpdateInternshipPageComponent;
  let fixture: ComponentFixture<UpdateInternshipPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateInternshipPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateInternshipPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
