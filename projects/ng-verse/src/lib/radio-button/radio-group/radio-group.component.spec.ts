import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioButtonComponent } from '../radio-button.component';
import { RadioGroupComponent } from './radio-group.component';

describe('RadioGroupComponent', () => {
  let component: RadioGroupTestComponent;
  let fixture: ComponentFixture<RadioGroupTestComponent>;
  let radioGroup: RadioGroupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioGroupTestComponent);
    component = fixture.componentInstance;
    radioGroup = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have 3 radio buttons', () => {
    const radioButtons =
      fixture.nativeElement.querySelectorAll('app-radio-button');
    expect(radioButtons.length).toBe(3);
  });
  it('should disable the radio button when the form control is disabled', () => {
    const formControl = component.formControl;
    formControl.disable();
    fixture.detectChanges();
    const radioButtons = fixture.nativeElement.querySelectorAll(
      'input[type="radio"]'
    ) as HTMLInputElement[];
    radioButtons.forEach((radioButton) => {
      expect(radioButton.disabled).toBeTrue();
    });
  });
  it("should select the radio button when it's value is selected", () => {
    const formControl = component.formControl;
    formControl.setValue(component.values[0]);
    fixture.detectChanges();
    const radioButton = fixture.nativeElement.querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement;
    expect(radioButton.checked).toBeTrue();
  });
  it("should add vertical class when it's vertical", () => {
    component.vertical.set(true);
    fixture.detectChanges();
    const radioGroup = fixture.nativeElement.querySelector('.radio-group');
    expect(radioGroup.classList.contains('vertical')).toBeTrue();
  });
  it("should generate the name for the radio group when it's not provided", () => {
    expect(radioGroup.name()).toContain('radio-group-');
  });
  it("when radio-button is clicked, it should update the form control's value", () => {
    const radioButtons = fixture.nativeElement.querySelectorAll(
      'input[type="radio"]'
    ) as HTMLInputElement[];
    radioButtons[1].dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.formControl.value).toBe(component.values[1]);
  });
  it('change on radio-button should mark the form control as touched', () => {
    const radioButtons = fixture.nativeElement.querySelectorAll(
      'input[type="radio"]'
    ) as HTMLInputElement[];
    radioButtons[1].dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.formControl.touched).toBeTrue();
  });
});

@Component({
  imports: [RadioGroupComponent, RadioButtonComponent, ReactiveFormsModule],
  template: `<app-radio-group
    [formControl]="formControl"
    [compareWith]="compare"
    [vertical]="vertical()"
  >
    @for (item of values; track $index) {
    <app-radio-button [value]="item"> {{ item.firstName }}</app-radio-button>
    }
  </app-radio-group> `,
})
class RadioGroupTestComponent {
  vertical = signal(false);
  values = [
    {
      firstName: 'Apple',
      price: 30,
    },
    {
      firstName: 'Orange',
      price: 70,
    },
    {
      firstName: 'Cherry',
      price: 100,
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formControl = new FormControl<any>(null, Validators.required);

  compare(o1: { price: number }, o2: { price: number }) {
    return o1?.price === o2.price;
  }
}
