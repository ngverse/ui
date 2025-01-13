import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  contentChildren,
  Directive,
  effect,
  ElementRef,
  HostListener,
  inject,
  input,
  OnDestroy,
  output,
  Renderer2,
  untracked,
} from '@angular/core';
import { ListboxItemDirective } from './listbox-item.directive';
import { ListboxState } from './listbox.state';

@Directive({
  selector: '[appListbox]',
  host: {
    tabindex: '0',
  },
})
export class ListboxDirective implements OnDestroy {
  autoActiveFirstOption = input(false);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  items = contentChildren(ListboxItemDirective, { descendants: true });
  keyManager: ActiveDescendantKeyManager<ListboxItemDirective> | undefined;
  renderer = inject(Renderer2);

  state = inject(ListboxState, { optional: true });

  selected = output();

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const activeOption = this.keyManager?.activeItem;
      if (activeOption) {
        activeOption.activated.emit();
      }
    }
    this.keyManager?.onKeydown(event);
  }

  constructor() {
    effect(() => {
      const contentItems = this.items();
      const stateItems = this.state?.items();
      let options = contentItems;
      if (stateItems) {
        options = stateItems;
      }

      if (options?.length) {
        this.keyManager?.destroy();
        this.keyManager = new ActiveDescendantKeyManager(options)
          .withWrap()
          .withTypeAhead();

        untracked(() => {
          if (this.autoActiveFirstOption()) {
            this.keyManager?.setFirstItemActive();
          }
        });

        this.keyManager.change.subscribe(() => {
          const activeOption = this.keyManager?.activeItem;
          if (activeOption) {
            activeOption.scrollIntoView();
          }
        });
      }
    });
  }

  activateItemOrFirstByIndex(index: number | undefined) {
    if (index === undefined || index === -1) {
      this.keyManager?.setFirstItemActive();
    } else {
      this.keyManager?.setActiveItem(index);
    }
  }

  ngOnDestroy(): void {
    this.keyManager?.destroy();
  }

  focus(activateFirst?: boolean) {
    this.host.nativeElement.focus();
    if (activateFirst) {
      this.keyManager?.setFirstItemActive();
    }
  }
}
