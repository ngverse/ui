import { CdkAutofill } from '@angular/cdk/text-field';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
  viewChild,
  viewChildren,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { InputDirective } from '../input/input.directive';

@Component({
  selector: 'app-otp-input',
  imports: [InputDirective, CdkAutofill],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OtpInputComponent implements OnDestroy {
  codeLength = input(4);
  codeLengthArray = computed(() => new Array(this.codeLength() - 1).fill(1));
  inputMode = input('numeric');
  filled = output<string>();

  private firstInput =
    viewChild.required<ElementRef<HTMLInputElement>>('firstInput');
  private inputs = viewChildren('inputs', {
    read: ElementRef<HTMLInputElement>,
  });
  private cf = inject(ChangeDetectorRef);
  private autoFillSub: Subscription | undefined;

  focus() {
    this.firstInput().nativeElement.focus();
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
    this.cf.detectChanges();
    this.checkIfFilled();
  }

  clear() {
    for (const input of this.inputs()) {
      input.nativeElement.value = '';
    }
    this.cf.detectChanges();
  }

  _autoFilled() {
    /**
     * When autofill is emitted,
     * the input value is not synced right away.
     * so we use setInterval to check the input value
     * if the value is not resolved after 10 times of tick
     * then we assume that the value is not resolved and stop the interval
     */
    const MAX_TICK = 10;
    let currentIteration = 0;
    const INTERVAL_TIME = 100;
    this.autoFillSub?.unsubscribe();

    this.autoFillSub = interval(INTERVAL_TIME).subscribe(() => {
      try {
        const value = this.firstInput().nativeElement.value;
        if (value) {
          this.fillFromText(value);
          this.autoFillSub?.unsubscribe();
          return;
        }
        if (currentIteration > MAX_TICK) {
          this.autoFillSub?.unsubscribe();
        }
        currentIteration++;
      } catch {
        this.autoFillSub?.unsubscribe();
      }
    });
  }

  _onInput(event: Event, index: number) {
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

  _onKeydown($event: KeyboardEvent, index: number) {
    if ($event.key === 'ArrowRight') {
      this.moveToNext(index);
    } else if ($event.key === 'ArrowLeft') {
      this.moveToPrev(index);
    }
  }

  _onPaste(event: ClipboardEvent) {
    const text = event.clipboardData?.getData('text');
    this.fillFromText(text);
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

  private moveToPrev(index: number) {
    const prevInput = this.prevInput(index);
    if (prevInput) {
      prevInput.nativeElement.focus();
    }
  }

  private moveToNext(index: number) {
    const nextInput = this.nextInput(index);
    if (nextInput) {
      nextInput.nativeElement.focus();
    }
  }

  private nextInput(index: number) {
    const inputs = this.inputs();
    if (inputs.length - 1 === index) {
      return;
    }
    const nextIndex = index + 1;

    return inputs[nextIndex];
  }

  private prevInput(index: number) {
    const inputs = this.inputs();
    if (index === 0) {
      return;
    }
    const prevIndex = index - 1;
    return inputs[prevIndex];
  }

  ngOnDestroy(): void {
    this.autoFillSub?.unsubscribe();
  }
}
