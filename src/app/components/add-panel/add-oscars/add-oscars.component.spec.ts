import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOscarsComponent } from './add-oscars.component';

describe('AddOscarsComponent', () => {
  let component: AddOscarsComponent;
  let fixture: ComponentFixture<AddOscarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOscarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOscarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
