import {
  computed,
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnDestroy,
  output,
} from '@angular/core';
import { ListboxState } from './listbox.state';

@Directive({
  selector: '[appListboxItem]',
  host: {
    '[class.listbox-item-active]': 'isActive()',
  },
})
export class ListboxItemDirective implements OnDestroy {
  host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

  state = inject(ListboxState);

  activated = output();

  @HostBinding('class.option-disabled')
  @Input()
  disabled: boolean | undefined;

  @HostListener('click')
  onClick() {
    this.activated.emit();
  }

  isActive = computed(() => this.state.isActive(this));

  get el() {
    return this.host.nativeElement;
  }
  constructor() {
    this.state?.add(this);
  }

  ngOnDestroy(): void {
    this.state?.remove(this);
  }

  getLabel?(): string {
    return this.el.textContent as string;
  }

  scrollIntoView() {
    this.host.nativeElement.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }
}
