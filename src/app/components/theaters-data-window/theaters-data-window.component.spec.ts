import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatersDataWindowComponent } from './theaters-data-window.component';

describe('TheatersDataWindowComponent', () => {
  let component: TheatersDataWindowComponent;
  let fixture: ComponentFixture<TheatersDataWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheatersDataWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheatersDataWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
