import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { KeyState } from '../state/key.state';

@Directive({
  selector: '[appCell]',
  host: {
    '(keydown)': 'onKeydown($event)',
    '(blur)': 'onBlur()',
    '[tabIndex]': 'tabIndex()',
    '(focus)': 'onFocus()',
    '[attr.data-date]': 'date()',
  },
})
export class CellDirective<T> implements OnDestroy {
  tabIndex = signal<0 | -1>(-1);
  keyState = inject(KeyState);
  private el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  date = input.required<T | string>();

  constructor() {
    this.keyState.add(this);
  }

  onKeydown($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      $event.preventDefault();
    }
    if ($event.key === ' ') {
      $event.preventDefault();
    }

    const isArrowLeft = $event.key === 'ArrowLeft';
    const isArrowRight = $event.key === 'ArrowRight';
    const isArrowUp = $event.key === 'ArrowUp';
    const isArrowDown = $event.key === 'ArrowDown';
    if (isArrowLeft || isArrowRight || isArrowUp || isArrowDown) {
      $event.preventDefault();
    }
  }

  focus() {
    this.el.focus();
  }

  onFocus() {
    this.activateTabIndex();
  }

  onBlur() {
    this.resetTabIndex();
  }

  private resetTabIndex() {
    this.tabIndex.set(-1);
  }

  private activateTabIndex() {
    this.tabIndex.set(0);
  }
  ngOnDestroy(): void {
    this.keyState.remove(this);
  }
}
