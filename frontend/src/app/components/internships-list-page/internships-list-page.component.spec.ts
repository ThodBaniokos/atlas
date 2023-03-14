import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternshipsListPageComponent } from './internships-list-page.component';

describe('InternshipsListPageComponent', () => {
  let component: InternshipsListPageComponent;
  let fixture: ComponentFixture<InternshipsListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternshipsListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InternshipsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
