import { Component, ComponentRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioButtonComponent } from './radio-button.component';
import { RadioButtonState } from './radio-button.state';

describe('RadioButtonComponent', () => {
  let fixture: ComponentFixture<RadioButtonComponent>;
  let componentRef: ComponentRef<RadioButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RadioButtonComponent, RadioButtonTestComponent],
      providers: [RadioButtonState],
    }).compileComponents();

    fixture = TestBed.createComponent(RadioButtonComponent);
    componentRef = fixture.componentRef;
    componentRef.setInput('value', 1);
    fixture.detectChanges();
  });
  it('should generate unique ID and attach to input and label', () => {
    const input = fixture.nativeElement.querySelector('input');
    const label = fixture.nativeElement.querySelector('label');
    expect(input.id).toContain('radio-button-');
    expect(input.id).toEqual(label.getAttribute('for'));
  });
  it("should set new ID if ID isn't provided", () => {
    const randomId = 'random-id';
    componentRef.setInput('id', randomId);
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
    const radioButtonState = TestBed.inject(RadioButtonState);
    radioButtonState.name.set('test');
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input.name).toEqual(radioButtonState.name());
  });
  it('RadioButtonState disabled should disable radio-button', () => {
    const radioButtonState = TestBed.inject(RadioButtonState);
    radioButtonState.disabled.set(true);
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector(
      'input'
    ) as HTMLInputElement;
    expect(input.disabled).toBeTrue();
  });
  it("radio-button should be selected on same value as RadioButtonState's value", () => {
    const radioButtonState = TestBed.inject(RadioButtonState);
    radioButtonState.writeValue(1);
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
    const radioButtonState = TestBed.inject(RadioButtonState);
    radioButtonState.writeValue(1);
    radioButtonState.compareWith.set(dummyCompareWith);
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
  imports: [RadioButtonComponent],
  template: `<app-radio-button [value]="1">
    I am radioButton
  </app-radio-button>`,
})
class RadioButtonTestComponent {}
