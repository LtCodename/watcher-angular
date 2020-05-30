import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchResultMovieComponent } from './search-result-movie.component';

describe('SearchResultMovieComponent', () => {
  let component: SearchResultMovieComponent;
  let fixture: ComponentFixture<SearchResultMovieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchResultMovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
