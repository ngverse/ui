import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  output,
  viewChild,
  viewChildren,
} from '@angular/core';
import { InputDirective } from '../input/input.directive';

@Component({
  selector: 'app-otp-input',
  imports: [InputDirective],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpInputComponent {
  codeLength = input(4);

  oneTimeCode = viewChild<ElementRef<HTMLInputElement>>('oneTimeCode');

  inputs = viewChildren('inputs', {
    read: ElementRef<HTMLInputElement>,
  });

  codeLengthArray = computed(() => new Array(this.codeLength()).fill(1));

  filled = output<string>();

  onInput(event: Event, index: number) {
    const inputEvent = event as InputEvent;

    if (inputEvent.inputType === 'insertFromPaste') {
      return;
    } else if (inputEvent.inputType === 'deleteContentBackward') {
      this.moveToPrev(index);
    } else if (
      inputEvent.inputType === 'insertText' ||
      inputEvent.inputType === 'deleteContentForward'
    ) {
      this.moveToNext(index);
    }
    this.checkIfFilled();
  }

  onKeydown($event: KeyboardEvent, index: number) {
    if ($event.key === 'ArrowRight') {
      this.moveToNext(index);
    } else if ($event.key === 'ArrowLeft') {
      this.moveToPrev(index);
    }
  }

  onPaste(event: ClipboardEvent) {
    const text = event.clipboardData?.getData('text');
    this.fillFromText(text);
  }

  fillFromText(text: string | undefined) {
    if (!text) {
      return;
    }
    const inputs = this.inputs();
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const input = inputs[i];
      if (input) {
        input.nativeElement.value = char;
      }
    }
    this.checkIfFilled();
  }

  private checkIfFilled() {
    const allField = this.inputs().every(
      (inp) =>
        inp.nativeElement.value !== null &&
        inp.nativeElement.value !== undefined &&
        inp.nativeElement.value !== ''
    );
    if (!allField) {
      return;
    }
    const value = this.inputs()
      .map((input) => input.nativeElement.value)
      .join('');
    if (allField) {
      this.filled.emit(value);
    }
  }

  moveToPrev(index: number) {
    const prevInput = this.prevInput(index);
    if (prevInput) {
      prevInput.nativeElement.focus();
    }
  }

  moveToNext(index: number) {
    const nextInput = this.nextInput(index);
    if (nextInput) {
      nextInput.nativeElement.focus();
    }
  }

  nextInput(index: number) {
    const inputs = this.inputs();
    if (inputs.length - 1 === index) {
      return;
    }
    const nextIndex = index + 1;

    return inputs[nextIndex];
  }

  prevInput(index: number) {
    const inputs = this.inputs();
    if (index === 0) {
      return;
    }
    const prevIndex = index - 1;
    return inputs[prevIndex];
  }
}
