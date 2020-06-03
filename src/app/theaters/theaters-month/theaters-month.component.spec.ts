import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatersMonthComponent } from './theaters-month.component';

describe('TheatersMonthComponent', () => {
  let component: TheatersMonthComponent;
  let fixture: ComponentFixture<TheatersMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheatersMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheatersMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
