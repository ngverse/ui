import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DividerComponent } from '@ngverse/divider/divider.component';
import { ListboxItemDirective } from '@ngverse/listbox/listbox-item.directive';
import { ListboxDirective } from '@ngverse/listbox/listbox.directive';

@Component({
  selector: 'doc-show-case-listbox',
  imports: [ListboxDirective, ListboxItemDirective, DividerComponent],
  templateUrl: './show-case-listbox.component.html',
  styleUrl: './show-case-listbox.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseListboxComponent {
  value = signal('');

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];

  valueChange(value: string) {
    this.value.set(value);
  }
}
