import { Directionality } from '@angular/cdk/bidi';
import {
  afterNextRender,
  Directive,
  inject,
  Injector,
  input,
  OnDestroy,
} from '@angular/core';
import { asyncScheduler, observeOn, Subscription } from 'rxjs';
import { RovingListboxKeyManager } from './roving-listbox-key-manager';
import { RovingListboxRegistry } from './roving-listbox-registry';

@Directive({
  selector: '[appRovingListbox]',
  host: {
    '(keydown)': 'onKeydown($event)',
  },
  providers: [
    {
      provide: RovingListboxRegistry,
      useFactory: () => {
        const injector = inject(Injector, { skipSelf: true });
        const parentListboxState = injector.get(RovingListboxRegistry, null);
        return parentListboxState ?? new RovingListboxRegistry();
      },
    },
  ],
})
export class RovingListboxDirective implements OnDestroy {
  withWrap = input(true);
  orientation = input<'horizontal' | 'vertical'>('vertical');
  registry = inject(RovingListboxRegistry);

  injector = inject(Injector);
  directonality = inject(Directionality);

  keyManager = new RovingListboxKeyManager(this.registry.items, this.injector);
  private tabSub: Subscription | undefined;

  onKeydown(event: KeyboardEvent) {
    this.keyManager.onKeydown(event);
  }

  constructor() {
    afterNextRender(() => {
      const orientation = this.orientation();
      const withWrap = this.withWrap();

      let keyManager = this.keyManager;

      if (withWrap) {
        keyManager = keyManager.withWrap();
      }

      if (orientation === 'vertical') {
        keyManager = this.keyManager.withVerticalOrientation(true);
      } else {
        keyManager = this.keyManager
          .withHorizontalOrientation(this.directonality.value)
          .withVerticalOrientation(false);
      }
      this.keyManager = keyManager;
      this.keyManager.setActiveItem(0);

      //We need to wait next tick,
      //So the item focus fires first
      //and then tabOut
      this.tabSub = this.keyManager.tabOut
        .pipe(observeOn(asyncScheduler))
        .subscribe(() => {
          const activeItem = this.keyManager.activeItem;
          activeItem?.restoreTabIndex();
        });
    });
  }
  ngOnDestroy(): void {
    this.keyManager.destroy();
    this.tabSub?.unsubscribe();
  }
}
