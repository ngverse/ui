import { Highlightable } from '@angular/cdk/a11y';
import {
  computed,
  Directive,
  ElementRef,
  inject,
  input,
  linkedSignal,
  OnDestroy,
} from '@angular/core';
import { A11yTabStack } from './tab-stack';

@Directive({
  selector: 'button[ktA11yTab]',
  host: {
    role: 'tab',
    '[attr.aria-controls]': 'panelId()',
    '[attr.aria-selected]': 'a11yIsSelected()',
    '[tabindex]': 'isActive()? 0 : -1',
    '(keydown)': 'onKeydown($event)',
    '[id]': 'id()',
    '(focus)': 'onFocus()',
  },
})
export class A11yTabDirective implements OnDestroy, Highlightable {
  a11yIsSelected = input.required<boolean>();
  private stack = inject(A11yTabStack);
  isActive = linkedSignal(() => this.a11yIsSelected());
  element = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>)
    .nativeElement;
  panelId = computed(() => this.stack.getPanelIdByTab(this));
  id = computed(() => this.stack.getTabId(this));
  constructor() {
    this.stack.add(this);
  }
  onFocus() {
    this.stack.setActiveItem(this);
  }
  setActiveStyles(): void {
    this.element.focus();
  }
  setInactiveStyles(): void {
    this.isActive.set(false);
  }

  onKeydown(event: KeyboardEvent) {
    this.stack.onKeyDown(event);
  }

  ngOnDestroy(): void {
    this.stack.remove(this);
  }
}
