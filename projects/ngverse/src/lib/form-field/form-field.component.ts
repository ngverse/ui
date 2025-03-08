import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  NgControl,
  StatusChangeEvent,
  TouchedChangeEvent,
  Validators,
} from '@angular/forms';
import { filter, merge, Subscription } from 'rxjs';
import { ErrorComponent } from './error.component';
import { FormFieldErrorRegistry } from './form-field-error.registry';

@Component({
  selector: 'app-form-field',
  imports: [ErrorComponent],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements OnDestroy {
  silentErrors = input<string[] | undefined>();
  showErrors = input<boolean>(true);
  hideRequiredMarker = input<boolean>(false);

  errors = signal<string[]>([]);
  invalid = signal(false);
  touched = signal(false);
  showCustomErrors = computed(
    () => !this.showErrors() || this.errors().length === 0
  );

  hasRequiredValidation = computed(() => {
    const control = this.ngControl()?.control;
    if (control) {
      return (
        control.hasValidator(Validators.required) ||
        control.hasValidator(Validators.requiredTrue)
      );
    }
    return false;
  });

  private ngControl = contentChild(NgControl);
  private sub: Subscription | undefined;
  private errorRegistry = inject(FormFieldErrorRegistry);
  private errorsCodes$ = toObservable(this.errorRegistry.errors);
  private silentErrors$ = toObservable(this.silentErrors);

  constructor() {
    effect(() => {
      const ngControl = this.ngControl();
      const control = ngControl?.control;
      if (!control) {
        this.sub?.unsubscribe();
        return;
      }

      const controlEvent = control.events.pipe(
        filter(
          (e) =>
            e instanceof TouchedChangeEvent || e instanceof StatusChangeEvent
        )
      );
      this.sub = merge(
        controlEvent,
        this.errorsCodes$,
        this.silentErrors$
      ).subscribe(() => {
        this.touched.set(control.touched);
        this.invalid.set(control.invalid);
        this.processErrors(control);
      });
    });
  }
  private processErrors(control: AbstractControl<unknown>) {
    const errors: string[] = [];
    const silentErrors = this.silentErrors();
    for (const key in control.errors) {
      const notInSilent = !silentErrors?.includes(key);
      if (control.errors[key] && notInSilent) {
        const errorLabel = this.errorRegistry.getMessage(
          key,
          control.errors[key]
        );
        if (errorLabel !== undefined) {
          errors.push(errorLabel);
        }
      }
    }

    this.errors.set(errors);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
