import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PopoverOriginDirective } from '@ng-verse/popover/popover-origin.directive';

@Component({
  selector: 'doc-show-case-popover',
  imports: [PopoverOriginDirective],
  templateUrl: './show-case-popover.component.html',
  styleUrl: './show-case-popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCasePopoverComponent {
  closed() {
    console.log('IA M CLOSED');
  }
}
