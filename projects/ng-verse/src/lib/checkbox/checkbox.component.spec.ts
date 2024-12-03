import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { Component, DebugElement, Type } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<CheckboxTest>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let rootComponent: CheckboxTest;
  let checkboxComponent: CheckboxComponent;
  let checkboxRootElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    });
    fixture = TestBed.createComponent(CheckboxTest);
    debugElement = fixture.debugElement;
    htmlElement = fixture.debugElement.nativeElement;
    rootComponent = fixture.componentInstance;
    checkboxComponent = debugElement.query(By.directive(CheckboxComponent))
      .componentInstance as CheckboxComponent;
    checkboxRootElement = htmlElement.querySelector('.checkbox') as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(checkboxComponent).toBeTruthy();
  });
  it('should disable checkbox with disable true', () => {
    checkboxComponent.disabled.set(true);
    fixture.detectChanges();
    expect(checkboxRootElement.classList).toContain('disabled');
  });
  it('should be true on click', () => {
    checkboxRootElement.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(rootComponent.formControl.value).toBeTrue();
  });

  // describe('value', () => {
  //   it('should be true on click', () => {
  //     const { fixture, htmlElement, debugElement } =
  //       createComponent(WithFormControl);
  //     const root = htmlElement.querySelector('.checkbox') as HTMLElement;
  //     fixture.detectChanges();
  //     root.dispatchEvent(new Event('click'));
  //     fixture.detectChanges();
  //     expect(fixture.componentInstance.formControl.value).toBeTrue();
  //   });
  //   it('should be false on double click', () => {
  //     const { fixture, htmlElement, debugElement } =
  //       createComponent(WithFormControl);
  //     const root = htmlElement.querySelector('.checkbox') as HTMLElement;
  //     fixture.detectChanges();
  //     root.dispatchEvent(new Event('click'));
  //     fixture.detectChanges();
  //     root.dispatchEvent(new Event('click'));
  //     fixture.detectChanges();
  //     expect(fixture.componentInstance.formControl.value).toBeFalse();
  //   });
  //   it('should set value, passed from FormControl', () => {
  //     const { fixture, htmlElement, debugElement, component } =
  //       createComponent(WithFormControl);
  //     fixture.detectChanges();
  //     component.formControl.setValue(true);
  //     fixture.detectChanges();
  //     const checkboxComponent = debugElement.query(
  //       By.directive(CheckboxComponent)
  //     ).componentInstance as CheckboxComponent;
  //     expect(checkboxComponent.value()).toBeTrue();
  //   });
  //   it('should not not toggle if is checkbox is disabled', () => {
  //     const { fixture, htmlElement, debugElement, component } =
  //       createComponent(WithFormControl);
  //     fixture.detectChanges();
  //     const checkboxComponent = debugElement.query(
  //       By.directive(CheckboxComponent)
  //     ).componentInstance as CheckboxComponent;
  //     checkboxComponent.disabled.set(true);
  //     fixture.detectChanges();
  //     const root = htmlElement.querySelector('.checkbox') as HTMLElement;
  //     root.dispatchEvent(new Event('click'));
  //     fixture.detectChanges();
  //     expect(checkboxComponent.value()).toBeFalsy();
  //   });
  //   it('should be disabled if formcontrol is disabled', () => {
  //     const { fixture, htmlElement, debugElement, component } =
  //       createComponent(WithFormControl);
  //     fixture.detectChanges();
  //     component.formControl.disable();
  //     fixture.detectChanges();
  //     const checkboxComponent = debugElement.query(
  //       By.directive(CheckboxComponent)
  //     ).componentInstance as CheckboxComponent;
  //     expect(checkboxComponent.disabled()).toBeTrue();
  //   });
  // });

  // describe('with label', () => {
  //   it('should display label', () => {
  //     const { fixture } = createComponent(WithLabel);

  //     const label = fixture.debugElement.query(By.css('label'))
  //       .nativeElement as HTMLElement;
  //     expect(label.textContent).toEqual('Checkbox Label');
  //   });
  // });
});

@Component({
  imports: [CheckboxComponent],
  template: ` <app-checkbox>Checkbox Label</app-checkbox> `,
})
class WithLabel {}

@Component({
  imports: [CheckboxComponent, ReactiveFormsModule],
  template: `<app-checkbox [formControl]="formControl"> </app-checkbox>`,
})
class WithFormControl {
  formControl = new FormControl();
}

@Component({
  imports: [CheckboxComponent, ReactiveFormsModule],
  template: `<app-checkbox [formControl]="formControl"> </app-checkbox>`,
})
class CheckboxTest {
  formControl = new FormControl();
}
