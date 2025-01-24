import { FocusableOption, FocusMonitor } from '@angular/cdk/a11y';
import {
  Directive,
  ElementRef,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { RovingListboxRegistry } from './roving-listbox-registry';

@Directive({
  selector: '[appRovingListboxItem]',
  host: {
    '[tabindex]': 'isActive()?0:-1',
  },
})
export class RovingListboxItemDirective implements FocusableOption, OnDestroy {
  registry = inject(RovingListboxRegistry);
  private host = inject(ElementRef<HTMLElement>);
  isActive = signal(false);
  focusMonitor = new FocusMonitor();
  private focusSub: Subscription;

  /** Whether the option is disabled. */
  disabled?: boolean;
  /** Gets the label for this option. */
  getLabel?(): string;

  constructor() {
    this.registry.add(this);
    this.focusSub = this.focusMonitor
      .monitor(this.host.nativeElement)
      .subscribe((origin) => {
        if (!origin) {
          this.isActive.set(false);
        } else if (origin === 'mouse' || origin === 'touch') {
          this.isActive.set(true);
        }
      });
  }

  restoreTabIndex() {
    this.isActive.set(true);
  }

  focus() {
    this.host.nativeElement.focus();
    this.isActive.set(true);
  }
  defocus() {
    this.isActive.set(false);
  }
  ngOnDestroy(): void {
    this.registry.remove(this);
    this.focusSub.unsubscribe();
  }
}
