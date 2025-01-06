import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  input,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import {
  AbstractControl,
  StatusChangeEvent,
  TouchedChangeEvent,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { ErrorComponent } from '../error/error.component';

const ERROR_MAP: Record<string, string> = {
  required: 'This field is required',
  email: 'Enter a valid email address',
  min: 'This field is too short',
  max: 'This field is too long',
};

@Component({
  selector: 'app-error-group',
  imports: [ErrorComponent],
  templateUrl: './error-group.component.html',
  styleUrl: './error-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorGroupComponent implements OnInit, OnDestroy {
  control = input.required<AbstractControl<unknown>>();
  cf = inject(ChangeDetectorRef);
  errors = signal<string[]>([]);
  silentErrors = input<string[] | undefined>();
  invalid = signal(false);
  touched = signal(false);
  sub = new Subscription();
  ngOnInit(): void {
    const control = this.control();
    this.sub.add(
      control.events.subscribe((e) => {
        if (e instanceof TouchedChangeEvent || e instanceof StatusChangeEvent) {
          this.touched.set(control.touched);
          this.invalid.set(control.invalid);
          this.processErrors(control);
        }
      })
    );
  }

  private processErrors(control: AbstractControl<unknown>) {
    const errors: string[] = [];
    const silentErrors = this.silentErrors();

    for (const key in control.errors) {
      const notInSilent = !silentErrors?.includes(key);
      if (control.errors[key] && notInSilent) {
        errors.push(ERROR_MAP[key]);
      }
    }

    this.errors.set(errors);
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
