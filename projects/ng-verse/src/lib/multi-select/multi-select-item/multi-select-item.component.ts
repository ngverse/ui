import { Highlightable } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  input,
  Input,
  signal,
} from '@angular/core';
import { ListboxItemDirective } from '@ng-verse/listbox/listbox-item.directive';
import { MultiSelectCheckIconComponent } from '../multi-select-check.component';
import { MultiSelectState } from '../multi-select.state';

@Component({
  selector: 'app-multi-select-item',
  imports: [MultiSelectCheckIconComponent],
  templateUrl: './multi-select-item.component.html',
  styleUrl: './multi-select-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ListboxItemDirective],
  host: {
    '[class.selected]': 'isSelected()',
  },
})
export class MultiSelectItemComponent implements Highlightable {
  private host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  isActive = signal(false);
  value = input.required<unknown>();
  state = inject(MultiSelectState);
  listboxItem = inject(ListboxItemDirective);

  isSelected = () => this.state.isSelected(this.value());

  constructor() {
    this.listboxItem.activated.subscribe(() => {
      this.state.toggleValue(this.value());
    });
  }

  get content() {
    return this.host.nativeElement.textContent;
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
