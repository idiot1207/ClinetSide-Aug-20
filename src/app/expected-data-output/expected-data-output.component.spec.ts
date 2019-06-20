import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpectedDataOutputComponent } from './expected-data-output.component';

describe('ExpectedDataOutputComponent', () => {
  let component: ExpectedDataOutputComponent;
  let fixture: ComponentFixture<ExpectedDataOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpectedDataOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpectedDataOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
