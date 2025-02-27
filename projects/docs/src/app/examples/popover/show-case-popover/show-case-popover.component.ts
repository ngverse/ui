import { ButtonComponent } from '@/ui/button/button.component';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PopoverComponent, PopoverOriginDirective } from '@ngverse/kit';

@Component({
  selector: 'doc-show-case-popover',
  imports: [PopoverOriginDirective, ButtonComponent, PopoverComponent],
  templateUrl: './show-case-popover.component.html',
  styleUrl: './show-case-popover.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCasePopoverComponent {
  isOpen = signal(false);
  toggle() {
    this.isOpen.update((isOpen) => !isOpen);
  }

  deleteUser() {
    alert('User deleted');
    this.isOpen.set(false);
  }
}
