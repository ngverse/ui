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

@Component({
  selector: 'app-option',
  templateUrl: './option.component.html',
  styleUrl: './option.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [ListboxItemDirective],
})
export class OptionComponent {
  host = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>);
  isActive = signal(false);
  value = input.required<unknown>();
  listboxItem = inject(ListboxItemDirective);

  activated = this.listboxItem.activated;

  @HostBinding('class.option-disabled')
  @Input()
  disabled?: boolean | undefined;
  getLabel?(): string {
    return this.host.nativeElement.textContent as string;
  }
}
