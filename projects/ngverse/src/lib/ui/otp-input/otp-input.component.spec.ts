import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { OtpInputComponent } from './otp-input.component';

describe('OtpInputComponent', () => {
  let component: OtpTestComponent;
  let fixture: ComponentFixture<OtpTestComponent>;
  let childComponent: OtpInputComponent;
  let inputs: HTMLInputElement[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpTestComponent],
      providers: [
        provideNoopAnimations(),
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OtpTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    childComponent = fixture.debugElement.query(By.directive(OtpInputComponent))
      .componentInstance as OtpInputComponent;
    spyOn(childComponent.filled, 'emit');
    inputs = fixture.nativeElement.querySelectorAll('.code-input');
  });

  function inputValue(
    input: HTMLInputElement,
    value: string,
    inputType: string
  ) {
    input.value = value;
    const inputEvent = new InputEvent('input', {
      inputType,
    });
    input.dispatchEvent(inputEvent);
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 4 inputs', () => {
    expect(inputs.length).toBe(4);
  });

  it('should move to next input after entering a value', () => {
    inputValue(inputs[0], '1', 'insertText');
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('should move to prev input after clearing the active input', () => {
    inputValue(inputs[2], '1', 'deleteContentBackward');
    expect(document.activeElement).toBe(inputs[1]);
  });

  it('should fill all inputs', () => {
    let i = 1;
    for (const input of inputs) {
      inputValue(input, (i++).toString(), 'deleteContentBackward');
    }

    expect(childComponent.filled.emit).toHaveBeenCalledWith('1234');
  });

  it('should fill all inputs on paste', () => {
    const clipboardData = '1234';
    const clipboardEvent = new ClipboardEvent('paste', {
      clipboardData: new DataTransfer(),
      bubbles: true,
    });
    clipboardEvent.clipboardData!.setData('text/plain', clipboardData);
    inputs[0].dispatchEvent(clipboardEvent);
    fixture.detectChanges();
    expect(childComponent.filled.emit).toHaveBeenCalledWith('1234');
  });

  it('should focus first input on focus', () => {
    childComponent.focus();
    expect(document.activeElement).toBe(inputs[0]);
  });

  it('should fill inputs by fillFromText', () => {
    childComponent.fillFromText('1234');
    expect(inputs[0].value).toBe('1');
    expect(inputs[1].value).toBe('2');
    expect(inputs[2].value).toBe('3');
    expect(inputs[3].value).toBe('4');
  });
});

@Component({
  selector: 'app-otp-test',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <app-otp-input /> `,
  imports: [OtpInputComponent],
})
export class OtpTestComponent {}
