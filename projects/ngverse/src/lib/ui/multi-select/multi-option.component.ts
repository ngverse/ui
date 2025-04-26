import { FontIconComponent } from '@/ui/font-icon/font-icon.component';
import { _IdGenerator, Highlightable } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  contentChild,
  ElementRef,
  forwardRef,
  inject,
  Input,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { MultiOptionContentDirective } from './multi-option-content.directive';
import { MultiOptionGroupComponent } from './multi-option-group.component';
import { MultiSelectComponent } from './multi-select.component';

@Component({
  selector: 'app-multi-option',
  templateUrl: './multi-option.component.html',
  styleUrl: './multi-option.component.css',
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
  imports: [FontIconComponent],
})
export class MultiOptionComponent<T> implements Highlightable {
  value = input.required<T>();
  @Input()
  disabled?: boolean | undefined;

  id = input(inject(_IdGenerator).getId('option-'));
  isActive = signal(false);
  isSelected = () => this.select.isSelected(this.value());
  private optionGroup = inject(MultiOptionGroupComponent, { optional: true });
  private optionContent = contentChild<MultiOptionContentDirective>(
    MultiOptionContentDirective
  );
  private contentEl = viewChild.required<ElementRef<HTMLElement>>('content');
  private element = inject(ElementRef<HTMLElement>)
    .nativeElement as HTMLElement;

  private select = inject<MultiSelectComponent<T>>(
    forwardRef(() => MultiSelectComponent)
  );

  inGroup = !!this.optionGroup;

  get content() {
    const optionContent = this.optionContent();
    return optionContent
      ? optionContent.content
      : this.contentEl().nativeElement.textContent;
  }

  getLabel(): string {
    return this.content ?? '';
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
