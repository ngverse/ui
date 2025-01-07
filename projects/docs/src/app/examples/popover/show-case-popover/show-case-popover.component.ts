import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { PopoverTriggerDirective } from '@ng-verse/popover/popover-trigger.directive';
import { PopoverComponent } from '@ng-verse/popover/popover.component';

@Component({
  selector: 'doc-show-case-popover',
  imports: [ButtonComponent, PopoverTriggerDirective, PopoverComponent],
  templateUrl: './show-case-popover.component.html',
  styleUrl: './show-case-popover.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCasePopoverComponent {
  closed() {
    console.log('IA M CLOSED');
  }
}
