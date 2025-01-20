import { FocusMonitor, ListKeyManager } from '@angular/cdk/a11y';
import {
  contentChildren,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Injector,
  input,
  OnDestroy,
  output,
  Renderer2,
} from '@angular/core';
import { ListboxItemDirective } from './listbox-item.directive';
import { ListboxState } from './listbox.state';

@Directive({
  selector: '[appListbox]',
  host: {
    tabindex: '0',
    class: 'listbox',
  },
  providers: [
    {
      provide: ListboxState,
      useFactory: () => {
        const injector = inject(Injector, { skipSelf: true });
        const parentListboxState = injector.get(ListboxState, null);
        return parentListboxState ?? new ListboxState();
      },
    },
  ],
})
export class ListboxDirective implements OnDestroy {
  state = inject(ListboxState);
  autoActiveFirstOption = input(false);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  items = contentChildren(ListboxItemDirective, { descendants: true });
  keyManager: ListKeyManager<ListboxItemDirective> | undefined;
  renderer = inject(Renderer2);
  focusMonitor = inject(FocusMonitor);
  focusItems = input(false);

  horizontal = input(false);

  listboxValue = input();

  selected = output();

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    this.state.onKeydown(event);
  }

  activeByIndex(index: number | undefined) {
    if (index !== undefined && index !== -1) {
      this.state.activateByIndex(index);
    } else {
      this.state.activateFirst();
    }
  }

  ngOnDestroy(): void {
    this.keyManager?.destroy();
  }

  focus(activateFirst?: boolean) {
    this.host.nativeElement.focus();
    if (activateFirst) {
      this.state.activateFirst();
    }
  }
}
