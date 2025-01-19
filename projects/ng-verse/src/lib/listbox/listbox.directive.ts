import {
  ActiveDescendantKeyManager,
  FocusKeyManager,
  FocusMonitor,
  ListKeyManager,
} from '@angular/cdk/a11y';
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
    class: 'listbox',
  },
})
export class ListboxDirective implements OnDestroy {
  autoActiveFirstOption = input(false);
  private host = inject<ElementRef<HTMLElement>>(ElementRef);
  items = contentChildren(ListboxItemDirective, { descendants: true });
  keyManager: ListKeyManager<ListboxItemDirective> | undefined;
  renderer = inject(Renderer2);
  focusMonitor = inject(FocusMonitor);
  focusItems = input(false);

  state = inject(ListboxState, { optional: true });

  horizontal = input(false);

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
      const horizontal = this.horizontal();
      const focusItems = this.focusItems();
      let options = contentItems;
      if (stateItems) {
        options = stateItems;
      }

      if (options?.length) {
        this.keyManager?.destroy();
        const keyManager = focusItems
          ? new FocusKeyManager(options)
          : new ActiveDescendantKeyManager(options);
        this.keyManager = keyManager.withWrap().withTypeAhead();
        if (horizontal) {
          this.keyManager = this.keyManager.withHorizontalOrientation('ltr');
        }

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
    effect(() => {
      if (this.focusItems()) {
        return;
      }
      this.focusMonitor.monitor(this.host.nativeElement).subscribe((origin) => {
        if (origin && origin !== 'mouse') {
          this.keyManager?.setFirstItemActive();
        } else {
          this.keyManager?.setActiveItem(-1);
        }
      });
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
