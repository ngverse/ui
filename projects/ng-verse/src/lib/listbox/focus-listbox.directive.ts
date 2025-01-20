import { Directive, effect, inject, Injector, input } from '@angular/core';
import { FocusListboxState } from './focus-listbox.state';

@Directive({
  selector: '[appFocusListbox]',
  providers: [
    {
      provide: FocusListboxState,
      useFactory: () => {
        const injector = inject(Injector, { skipSelf: true });
        const parentListboxState = injector.get(FocusListboxState, null);
        return parentListboxState ?? new FocusListboxState();
      },
    },
  ],
})
export class FocusListboxDirective {
  horizontal = input(false);
  state = inject(FocusListboxState);

  constructor() {
    effect(() => {
      this.state.horizontal.set(this.horizontal());
    });
  }
}
