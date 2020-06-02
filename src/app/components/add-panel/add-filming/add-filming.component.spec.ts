import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilmingComponent } from './add-filming.component';

describe('AddFilmingComponent', () => {
  let component: AddFilmingComponent;
  let fixture: ComponentFixture<AddFilmingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFilmingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFilmingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
