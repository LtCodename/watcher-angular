import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmingPageComponent } from './filming-page.component';

describe('FilmingPageComponent', () => {
  let component: FilmingPageComponent;
  let fixture: ComponentFixture<FilmingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
