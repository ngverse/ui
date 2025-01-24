import { ListKeyManager } from '@angular/cdk/a11y';
import { RovingListboxItemDirective } from './roving-listbox-item.directive';

export class RovingListboxKeyManager extends ListKeyManager<RovingListboxItemDirective> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override setActiveItem(index: any): void {
    if (this.activeItem) {
      this.activeItem.defocus();
    }

    super.setActiveItem(index);

    if (this.activeItem) {
      this.activeItem.focus();
    }
  }
}
