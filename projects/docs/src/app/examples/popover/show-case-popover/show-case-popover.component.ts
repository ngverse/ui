import { ButtonComponent } from '@/ui/button/button.component';
import { PopoverOriginDirective } from '@/ui/popover/popover-origin.directive';
import { PopoverComponent } from '@/ui/popover/popover.component';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

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
