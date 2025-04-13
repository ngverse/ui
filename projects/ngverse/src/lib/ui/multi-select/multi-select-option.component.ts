import { _IdGenerator, Highlightable } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  Input,
  signal,
  viewChild,
} from '@angular/core';
import { FontIconComponent } from '../icon/font-icon.component';
import { OptionGroupComponent } from '../select/option-group.component';
import { MultiSelectComponent } from './multi-select.component';

@Component({
  selector: 'app-multi-select-option',
  imports: [FontIconComponent],
  templateUrl: './multi-select-option.component.html',
  styleUrl: './multi-select-option.component.css',
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
export class MultiSelectOptionComponent implements Highlightable {
  value = input.required<unknown>();
  @Input()
  disabled?: boolean | undefined;

  id = input(inject(_IdGenerator).getId('multi-option-'));
  isActive = signal(false);
  isSelected = () => this.select.isSelected(this.value());
  optionGroup = inject(OptionGroupComponent, { optional: true });

  element = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;

  select = inject<MultiSelectComponent>(forwardRef(() => MultiSelectComponent));

  inGroup = !!this.optionGroup;

  private host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

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
