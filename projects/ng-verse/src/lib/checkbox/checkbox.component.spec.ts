import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CheckboxComponent } from './checkbox.component';

describe('CheckboxComponent', () => {
  let fixture: ComponentFixture<CheckboxTestComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let rootComponent: CheckboxTestComponent;
  let checkboxComponent: CheckboxComponent;
  let checkboxRootElement: HTMLElement;
  let checkboxNativeElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckboxComponent],
    });
    fixture = TestBed.createComponent(CheckboxTestComponent);
    debugElement = fixture.debugElement;
    htmlElement = fixture.debugElement.nativeElement;
    rootComponent = fixture.componentInstance;
    checkboxComponent = debugElement.query(By.directive(CheckboxComponent))
      .componentInstance as CheckboxComponent;
    checkboxRootElement = htmlElement.querySelector('.checkbox') as HTMLElement;
    checkboxNativeElement = htmlElement.querySelector('input') as HTMLElement;
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
  it('should be true on change', () => {
    checkboxNativeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(rootComponent.formControl.value).toBeTrue();
  });
});

@Component({
  imports: [CheckboxComponent, ReactiveFormsModule],
  template: `<app-checkbox [formControl]="formControl"> </app-checkbox>`,
})
class CheckboxTestComponent {
  formControl = new FormControl();
}
