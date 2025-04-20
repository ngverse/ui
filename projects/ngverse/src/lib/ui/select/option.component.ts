import { _IdGenerator, Highlightable } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  Input,
  input,
  signal,
  viewChild,
} from '@angular/core';

import { FontIconComponent } from '../icon/font-icon.component';
import { OptionGroupComponent } from './option-group.component';
import { SelectComponent } from './select.component';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrl: './option.component.css',
  imports: [FontIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'option',
    '(click)': 'onClick()',
    '[class.is-active]': 'isActive()',
    '[class.in-group]': 'inGroup',
    '[class.selected]': 'isSelected()',
    '[id]': 'id()',
    '[attr.aria-selected]': 'isSelected()',
    '[attr.aria-disabled]': 'disabled',
  },
})
export class OptionComponent<T> implements Highlightable {
  value = input.required<T>();
  @Input()
  disabled?: boolean | undefined;

  id = input(inject(_IdGenerator).getId('option-'));
  isActive = signal(false);
  isSelected = () => this.select.isSelected(this.value());
  optionGroup = inject(OptionGroupComponent, { optional: true });

  element = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;

  select = inject<SelectComponent<T>>(forwardRef(() => SelectComponent));

  inGroup = !!this.optionGroup;

  contentEl = viewChild.required<ElementRef<HTMLElement>>('content');

  get content() {
    return this.contentEl().nativeElement.textContent;
  }

  getLabel(): string {
    return this.contentEl().nativeElement.textContent || '';
  }

  onClick() {
    this.select.toggleValue(this);
  }

  setActiveStyles(): void {
    this.isActive.set(true);
    this.scrollIntoView();
  }

  scrollIntoView() {
    this.element.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }
  setInactiveStyles(): void {
    this.isActive.set(false);
  }
}
