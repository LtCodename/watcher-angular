import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatersYearComponent } from './theaters-year.component';

describe('TheatersYearComponent', () => {
  let component: TheatersYearComponent;
  let fixture: ComponentFixture<TheatersYearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheatersYearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheatersYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
