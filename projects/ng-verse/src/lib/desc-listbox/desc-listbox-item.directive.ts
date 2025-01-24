import { Highlightable } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { DescListboxRegistry } from './desc-listbox-registry';

@Directive({
  selector: '[appDescListboxItem]',
  host: {
    '[class.active]': 'isActive()',
  },
})
export class DescListboxItemDirective implements OnDestroy, Highlightable {
  registry = inject(DescListboxRegistry);
  value = input<unknown>(undefined, { alias: 'appDescListboxItem' });
  isActive = signal(false);
  private host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  constructor() {
    this.registry.add(this);
  }
  setActiveStyles(): void {
    this.isActive.set(true);
  }
  setInactiveStyles(): void {
    this.isActive.set(false);
  }
  disabled?: boolean | undefined;
  getLabel?(): string {
    return this.host.nativeElement.textContent || '';
  }

  ngOnDestroy(): void {
    this.registry.remove(this);
  }

  emitEnter() {
    this.host.nativeElement.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter' })
    );
  }
}
