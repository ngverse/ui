import { Highlightable } from '@angular/cdk/a11y';
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
  isActive = signal(false);
  value = input.required<unknown>();
  isSelected = () => this.select.isSelected(this.value());

  private host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);

  select = inject<SelectComponent>(forwardRef(() => SelectComponent));

  get content() {
    return this.host.nativeElement.textContent;
  }

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

  //we can't use signal input for now
  //it is property of highlightable interface
  //and it needs bo be this shape
  @Input()
  disabled?: boolean | undefined;

  getLabel?(): string {
    return this.content || '';
  }
}
