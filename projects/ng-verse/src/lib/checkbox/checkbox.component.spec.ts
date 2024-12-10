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
});

@Component({
  imports: [CheckboxComponent, ReactiveFormsModule],
  template: `<app-checkbox [formControl]="formControl"> </app-checkbox>`,
})
class CheckboxTest {
  formControl = new FormControl();
}
