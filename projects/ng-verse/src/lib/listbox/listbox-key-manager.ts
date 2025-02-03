import { ListKeyManager } from '@angular/cdk/a11y';
import { ListboxItemDirective } from './listbox-item.directive';

export class ListboxKeyManager extends ListKeyManager<ListboxItemDirective> {
  private _focusTarget: boolean | undefined;

  focusTarget(focus?: boolean) {
    this._focusTarget = focus;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override setActiveItem(index: any): void {
    if (this.activeItem) {
      this.activeItem.deactivate();
    }

    super.setActiveItem(index);

    //If index is -1 reset tabState
    //and set firstItem tabIndex=0
    if (index === -1) {
      this.focusTarget(false);
      this.setFirstItemActive();
    }

    if (this.activeItem) {
      this.activeItem.activate(this._focusTarget);
    }
  }
}
