import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  input,
  signal,
} from '@angular/core';
import { ListboxItemDirective } from '@ng-verse/listbox/listbox-item.directive';
import { SelectState } from '../select.state';

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ListboxItemDirective],
  host: {
    '[class.selected]': 'isSelected()',
  },
})
export class OptionComponent {
  host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  isActive = signal(false);
  value = input.required<unknown>();
  listboxItem = inject(ListboxItemDirective);
  state = inject(SelectState);

  isSelected = () => this.state.isSelected(this.value());

  constructor() {
    this.listboxItem.activated.subscribe(() => {
      this.state.setValue(this.value());
    });
  }

  @HostBinding('class.option-disabled')
  @Input()
  disabled?: boolean | undefined;
  getLabel?(): string {
    return this.host.nativeElement.textContent as string;
  }
}
