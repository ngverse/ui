import { Component } from '@angular/core';
import { TooltipDirective } from '../../../../../ng-verse/src/lib/tooltip/tooltip.directive';

@Component({
  selector: 'exp-show-case-tooltip',
  imports: [TooltipDirective],
  templateUrl: './show-case-tooltip.component.html',
  styleUrl: './show-case-tooltip.component.scss',
})
export class ShowCaseTooltipComponent {}
