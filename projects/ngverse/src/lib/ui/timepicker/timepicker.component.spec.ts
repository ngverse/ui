import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimepickerComponent } from './timepicker.component';

xdescribe('TimepickerComponent', () => {
  let component: TimepickerComponent;
  let fixture: ComponentFixture<TimepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimepickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
