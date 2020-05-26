import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDataWindowComponent } from './movie-data-window.component';

describe('MovieDataWindowComponent', () => {
  let component: MovieDataWindowComponent;
  let fixture: ComponentFixture<MovieDataWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieDataWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieDataWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
