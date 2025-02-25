import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RadioButtonComponent } from './radio-button.component';
import { RadioGroupComponent } from './radio-group.component';

describe('RadioGroupComponent', () => {
  let component: RadioGroupTestComponent;
  let fixture: ComponentFixture<RadioGroupTestComponent>;
  let radioGroup: RadioGroupComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioGroupTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioGroupTestComponent);
    component = fixture.componentInstance;
    radioGroup = fixture.debugElement.children[0].componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have 3 radio buttons', () => {
    const radioButtons =
      fixture.nativeElement.querySelectorAll('app-radio-button');
    expect(radioButtons.length).toBe(3);
  });
  it('should disable the radio button when the form control is disabled', async () => {
    const formControl = component.formControl;
    formControl.disable();
    await fixture.whenStable();
    const radioButtons = fixture.nativeElement.querySelectorAll(
      'input[type="radio"]'
    ) as HTMLInputElement[];
    radioButtons.forEach((radioButton) => {
      expect(radioButton.disabled).toBeTrue();
    });
  });
  it("should select the radio button when it's value is selected", async () => {
    const formControl = component.formControl;
    formControl.setValue(component.values[0]);
    await fixture.whenStable();
    const radioButton = fixture.nativeElement.querySelector(
      'input[type="radio"]'
    ) as HTMLInputElement;
    expect(radioButton.checked).toBeTrue();
  });
  it("should add vertical class when it's vertical", async () => {
    component.vertical.set(true);
    await fixture.whenStable();
    const radioGroup = fixture.nativeElement.querySelector('.radio-group');
    expect(radioGroup.classList.contains('vertical')).toBeTrue();
  });
  it("should generate the name for the radio group when it's not provided", () => {
    expect(radioGroup.name()).toContain('radio-group-');
  });
  it("when radio-button is clicked, it should update the form control's value", async () => {
    const radioButtons = fixture.nativeElement.querySelectorAll(
      'input[type="radio"]'
    ) as HTMLInputElement[];
    radioButtons[1].dispatchEvent(new Event('change'));
    await fixture.whenStable();
    expect(component.formControl.value).toBe(component.values[1]);
  });
  it('change on radio-button should mark the form control as touched', async () => {
    const radioButtons = fixture.nativeElement.querySelectorAll(
      'input[type="radio"]'
    ) as HTMLInputElement[];
    radioButtons[1].dispatchEvent(new Event('change'));
    await fixture.whenStable();
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  formControl = new FormControl<unknown>(null, Validators.required);

  compare(o1: { price: number }, o2: { price: number }) {
    return o1?.price === o2.price;
  }
}
