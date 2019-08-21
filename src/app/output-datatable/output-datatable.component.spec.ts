import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputDatatableComponent } from './output-datatable.component';

describe('OutputDatatableComponent', () => {
  let component: OutputDatatableComponent;
  let fixture: ComponentFixture<OutputDatatableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputDatatableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
