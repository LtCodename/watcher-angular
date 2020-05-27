import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeYearWindowComponent } from './change-year-window.component';

describe('ChangeYearWindowComponent', () => {
  let component: ChangeYearWindowComponent;
  let fixture: ComponentFixture<ChangeYearWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeYearWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeYearWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
