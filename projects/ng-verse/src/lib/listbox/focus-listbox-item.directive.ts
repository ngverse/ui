import { Directive, ElementRef, inject, OnDestroy } from '@angular/core';
import { FocusListboxState } from './focus-listbox.state';

@Directive({
  selector: '[appFocusListboxItem]',
  host: {
    '(keydown)': 'onKeydown($event)',
  },
})
export class FocusListboxItemDirective implements OnDestroy {
  state = inject(FocusListboxState);
  private host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

  onKeydown($event: KeyboardEvent) {
    this.state.onKeydown($event, this);
  }

  focus() {
    this.host.nativeElement.focus();
  }

  constructor() {
    this.state.add(this);
  }
  ngOnDestroy(): void {
    this.state.remove(this);
  }
}
