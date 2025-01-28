import { DOCUMENT } from '@angular/common';
import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  output,
} from '@angular/core';
import { filter, fromEvent, Subscription, take } from 'rxjs';

@Directive({
  selector: '[appOutsideClick]',
})
export class OutsideClickDirective implements OnDestroy {
  turnOn = input<boolean>(false, { alias: 'appOutsideClick' });
  el = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  document = inject(DOCUMENT);
  outsideClicked = output();
  sub: Subscription | undefined;

  get nativeElement() {
    return this.el.nativeElement;
  }
  constructor() {
    effect(() => {
      this.sub?.unsubscribe();
      const turnOn = this.turnOn();
      if (turnOn) {
        this.sub = fromEvent<TouchEvent>(this.document, 'click')
          .pipe(
            filter((event) => {
              const target = event.target as HTMLElement;
              if (target) {
                if (
                  target === this.nativeElement ||
                  this.nativeElement.contains(target)
                ) {
                  return false;
                }
              }

              return true;
            }),
            take(1)
          )
          .subscribe(() => {
            this.outsideClicked.emit();
          });
      }
    });
  }
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
