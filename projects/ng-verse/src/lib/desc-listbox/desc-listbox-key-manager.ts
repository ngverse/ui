import { ListKeyManager } from '@angular/cdk/a11y';
import { DescListboxItemDirective } from './desc-listbox-item.directive';

export class DescListboxKeyManager extends ListKeyManager<DescListboxItemDirective> {
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
