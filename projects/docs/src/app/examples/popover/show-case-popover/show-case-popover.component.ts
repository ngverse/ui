import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PopoverTriggerDirective } from '@ng-verse/popover/popover-trigger.directive';

@Component({
  selector: 'doc-show-case-popover',
  imports: [PopoverTriggerDirective],
  templateUrl: './show-case-popover.component.html',
  styleUrl: './show-case-popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCasePopoverComponent {
  closed() {
    console.log('IA M CLOSED');
  }
}
