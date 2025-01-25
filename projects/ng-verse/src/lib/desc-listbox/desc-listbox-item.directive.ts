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
    '[tabindex]': 'isActive()?0:-1',
  },
})
export class DescListboxItemDirective implements OnDestroy {
  registry = inject(DescListboxRegistry);
  value = input<unknown>(undefined, { alias: 'appDescListboxItem' });
  isActive = signal(false);
  host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  constructor() {
    this.registry.add(this);
  }
  disabled?: boolean | undefined;
  getLabel?(): string {
    return this.host.nativeElement.textContent || '';
  }

  ngOnDestroy(): void {
    this.registry.remove(this);
  }

  focus() {
    this.host.nativeElement.focus();
    this.isActive.set(true);
  }

  defocus() {
    this.isActive.set(false);
  }
}
