import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../../../ngverse/src/lib/button/button.component';
import { InputDirective } from '../../../../../../ngverse/src/lib/input/input.directive';
import { TooltipDirective } from '../../../../../../ngverse/src/lib/tooltip/tooltip.directive';

@Component({
  selector: 'doc-show-case-tooltip',
  imports: [TooltipDirective, ButtonComponent, InputDirective],
  templateUrl: './show-case-tooltip.component.html',
  styleUrl: './show-case-tooltip.component.css',
})
export class ShowCaseTooltipComponent {}
