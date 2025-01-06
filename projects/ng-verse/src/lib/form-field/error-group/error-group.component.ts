import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';
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
export class ErrorGroupComponent implements OnInit, DoCheck {
  ngDoCheck(): void {
    const control = this.control();
    this.invalid.set(control.invalid);
    this.touched.set(control.touched);
    this.processErrors(control);
    this.cf.markForCheck();
  }
  control = input.required<AbstractControl<unknown>>();
  cf = inject(ChangeDetectorRef);
  errors = signal<string[]>([]);
  invalid = signal(false);
  touched = signal(false);
  sub = new Subscription();
  ngOnInit(): void {
    const control = this.control();
    this.sub.add(
      control.statusChanges.subscribe(() => {
        this.invalid.set(control.invalid);
        this.touched.set(control.touched);
        this.processErrors(control);
        this.cf.markForCheck();
      })
    );
  }

  private processErrors(control: AbstractControl<unknown>) {
    const errors: string[] = [];
    for (const key in control.errors) {
      if (control.errors[key]) {
        errors.push(ERROR_MAP[key]);
      }
    }

    this.errors.set(errors);
  }
}
