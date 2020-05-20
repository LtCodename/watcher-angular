import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheatersPageComponent } from './theaters-page.component';

describe('TheatersPageComponent', () => {
  let component: TheatersPageComponent;
  let fixture: ComponentFixture<TheatersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheatersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheatersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
