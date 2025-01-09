import { Highlightable } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  Input,
  output,
  signal,
} from '@angular/core';
import { MultiSelectCheckIconComponent } from '../multi-select-check.component';
import { MultiSelectState } from '../multi-select.state';

@Component({
  selector: 'app-multi-select-item',
  imports: [MultiSelectCheckIconComponent],
  templateUrl: './multi-select-item.component.html',
  styleUrl: './multi-select-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.selected]': 'selected()',
  },
})
export class MultiSelectItemComponent implements Highlightable {
  private host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  isActive = signal(false);
  clicked = output();
  value = input.required<unknown>();
  state = inject(MultiSelectState);

  selected = computed(() => this.state.isSelected(this.value()));

  get content() {
    return this.host.nativeElement.textContent;
  }

  scrollIntoView() {
    this.host.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    });
  }

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
