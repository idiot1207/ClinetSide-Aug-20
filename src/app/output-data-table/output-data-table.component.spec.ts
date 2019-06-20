import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputDataTableComponent } from './output-data-table.component';

describe('OutputDataTableComponent', () => {
  let component: OutputDataTableComponent;
  let fixture: ComponentFixture<OutputDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
