import { Highlightable } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { ListboxState } from './listbox.state';

@Directive({
  selector: '[appListboxItem]',
  host: {
    '[class.listbox-item-active]': 'isActive()',
  },
})
export class ListboxItemDirective implements Highlightable, OnDestroy {
  host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

  isActive = signal(false);

  state = inject(ListboxState, { optional: true });

  activated = output();

  @HostListener('click')
  onClick() {
    this.activated.emit();
  }

  get el() {
    return this.host.nativeElement;
  }
  constructor() {
    this.state?.add(this);
  }
  ngOnDestroy(): void {
    this.state?.remove(this);
  }
  setActiveStyles(): void {
    this.isActive.set(true);
  }
  setInactiveStyles(): void {
    this.isActive.set(false);
  }
  disabled?: boolean | undefined;
  getLabel?(): string {
    return this.el.textContent as string;
  }

  scrollIntoView() {
    this.host.nativeElement.scrollIntoView({
      block: 'end',
      inline: 'nearest',
    });
  }
}
