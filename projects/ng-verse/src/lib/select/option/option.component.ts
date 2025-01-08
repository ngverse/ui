import { Highlightable } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  Input,
  input,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-option',
  imports: [],
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.option-active]': 'isActive()',
  },
})
export class OptionComponent implements Highlightable {
  host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  isActive = signal(false);
  clicked = output();
  value = input.required<unknown>();

  @HostListener('click')
  onClick() {
    this.clicked.emit();
  }

  setActiveStyles(): void {
    this.isActive.set(true);
  }
  setInactiveStyles(): void {
    this.isActive.set(false);
  }
  @HostBinding('class.option-disabled')
  @Input()
  disabled?: boolean | undefined;
  getLabel?(): string {
    return this.host.nativeElement.textContent as string;
  }
}
