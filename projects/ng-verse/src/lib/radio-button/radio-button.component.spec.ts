import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioButtonComponent } from './radio-button.component';
import { RadioButtonState } from './radio-button.state';

describe('RadioButtonComponent', () => {
  let component: RadioButtonTestComponent;
  let fixture: ComponentFixture<RadioButtonTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonTestComponent],
      providers: [RadioButtonState],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioButtonTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  imports: [RadioButtonComponent],
  template: `<app-radio-button [value]="1"> </app-radio-button>`,
})
class RadioButtonTestComponent {}
