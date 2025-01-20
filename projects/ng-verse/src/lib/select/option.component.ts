import { Highlightable } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { SelectCheckIconComponent } from './select-check-icon.component';
import { SelectComponent } from './select.component';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  imports: [SelectCheckIconComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent implements Highlightable {
  setActiveStyles(): void {
    this.isActive.set(true);
    this.host.nativeElement.scrollIntoView({
      block: 'nearest',
      inline: 'nearest',
    });
  }
  setInactiveStyles(): void {
    this.isActive.set(false);
  }
  disabled?: boolean | undefined;
  getLabel?(): string {
    return this.host.nativeElement.textContent || '';
  }
  isActive = signal(false);
  value = input.required<unknown>();
  isSelected = () => this.select.isSelected(this.value());

  private host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

  select = inject<SelectComponent>(forwardRef(() => SelectComponent));

  get content() {
    return this.host.nativeElement.textContent;
  }
}
