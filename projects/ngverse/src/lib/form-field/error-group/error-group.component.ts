import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  StatusChangeEvent,
  TouchedChangeEvent,
} from '@angular/forms';
import { filter, merge, Subscription } from 'rxjs';
import { ErrorComponent } from '../error/error.component';
import { FormFieldErrorRegistry } from '../form-field-error.registry';

@Component({
  selector: 'app-error-group',
  imports: [ErrorComponent],
  templateUrl: './error-group.component.html',
  styleUrl: './error-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorGroupComponent implements OnInit, OnDestroy {
  control = input.required<AbstractControl<unknown>>();
  silentErrors = input<string[] | undefined>();
  errors = signal<string[]>([]);
  invalid = signal(false);
  touched = signal(false);

  private sub = new Subscription();
  private errorRegistry = inject(FormFieldErrorRegistry);
  private errorsCodes$ = toObservable(this.errorRegistry.errors);
  private silentErrors$ = toObservable(this.silentErrors);

  ngOnInit(): void {
    const control = this.control();
    const controlEvent = control.events.pipe(
      filter(
        (e) => e instanceof TouchedChangeEvent || e instanceof StatusChangeEvent
      )
    );
    this.sub.add(
      merge(controlEvent, this.errorsCodes$, this.silentErrors$).subscribe(
        () => {
          this.touched.set(control.touched);
          this.invalid.set(control.invalid);
          this.processErrors(control);
        }
      )
    );
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
    this.sub.unsubscribe();
  }
}
