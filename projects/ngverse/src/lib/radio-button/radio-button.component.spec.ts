import {
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  input,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RadioButtonComponent } from './radio-button.component';
import { RadioGroupComponent } from './radio-group.component';

describe('RadioButtonComponent', () => {
  let fixture: ComponentFixture<RadioButtonTestComponent>;
  let componentRef: ComponentRef<RadioButtonTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioButtonTestComponent);
    componentRef = fixture.componentRef;
    componentRef.setInput('value', 1);

    fixture.detectChanges();
  });

  it("should set new ID if ID isn't provided", () => {
    const randomId = 'random-id';
    fixture.componentRef.setInput('id', randomId);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input');
    const label = fixture.nativeElement.querySelector('label');
    expect(input.id).toBe(randomId);
    expect(input.id).toEqual(label.getAttribute('for'));
  });
  it('selection should change the icon and input checked attribute', () => {
    const input = fixture.nativeElement.querySelector(
      'input'
    ) as HTMLInputElement;
    const icon = fixture.nativeElement.querySelector('.radio-button-icon');
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(input.checked).toBeTrue();
    expect(icon.classList.contains('checked')).toBeTrue();
  });
  it('disable should disable radio-button', () => {
    const input = fixture.nativeElement.querySelector(
      'input'
    ) as HTMLInputElement;
    componentRef.setInput('disabled', true);
    fixture.detectChanges();
    expect(input.disabled).toBeTrue();
    input.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(input.checked).toBeFalse();
  });

  it("name should be the same as RadioButtonState's name", () => {
    const radioGroup = fixture.debugElement.query(
      By.directive(RadioGroupComponent)
    ).componentInstance;
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input.name).toEqual(radioGroup.name());
  });
  it('RadioButtonState disabled should disable radio-button', () => {
    fixture.componentInstance.formControl.disable();
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input.disabled).toBeTrue();
  });
  it('radio-button should be selected on same value as Form control value', () => {
    fixture.componentRef.setInput('value', 1);
    fixture.detectChanges();
    fixture.componentInstance.formControl.setValue(1);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input.checked).toBeTrue();
  });
  it('compare with should select radio-button properly', () => {
    const dummyCompareWith = (a: number) => {
      if (a === 2) {
        return true;
      }
      return false;
    };
    fixture.componentInstance.formControl.setValue(1);
    componentRef.setInput('compareWith', dummyCompareWith);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input.checked).toBeFalsy();
    componentRef.setInput('value', 2);
    fixture.detectChanges();
    expect(input.checked).toBeFalsy();
  });
  it('ng-content should be displayed', () => {
    const fixture = TestBed.createComponent(RadioButtonTestComponent);
    const content = fixture.nativeElement.querySelector('label').textContent;
    expect(content.trim()).toBe('I am radioButton');
  });
});

@Component({
  imports: [RadioButtonComponent, RadioGroupComponent, ReactiveFormsModule],
  template: `
    <app-radio-group [compareWith]="compareWith()" [formControl]="formControl">
      <app-radio-button [id]="id()" [disabled]="disabled()" [value]="value()">
        I am radioButton
      </app-radio-button>
    </app-radio-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class RadioButtonTestComponent {
  value = input();
  id = input();
  disabled = input();
  formControl = new FormControl();
  compareWith = input((o1: unknown, o2: unknown) => o1 === o2);
}
