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
} from '@angular/core';
import {
  matCheckBox,
  matCheckBoxOutlineBlank,
} from '@ng-icons/material-icons/baseline';
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
export class OptionComponent implements Highlightable {
  value = input.required<unknown>();
  @Input()
  disabled?: boolean | undefined;

  CHECK_ICON = matCheckBox;
  UNCHECK_ICON = matCheckBoxOutlineBlank;

  id = input(inject(_IdGenerator).getId('option-'));
  isActive = signal(false);
  isSelected = () => this.select.isSelected(this.value());
  optionGroup = inject(OptionGroupComponent, { optional: true });

  element = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;

  select = inject<SelectComponent>(forwardRef(() => SelectComponent));

  inGroup = !!this.optionGroup;

  private host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

  get content() {
    return this.host.nativeElement.textContent;
  }

  getLabel(): string {
    return this.host.nativeElement.textContent || '';
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
