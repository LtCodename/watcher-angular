import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OscarsPageComponent } from './oscars-page.component';

describe('OscarsPageComponent', () => {
  let component: OscarsPageComponent;
  let fixture: ComponentFixture<OscarsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OscarsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OscarsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
