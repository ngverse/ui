import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../../../ngverse/src/lib/ui/button/button.component';
import { InputDirective } from '../../../../../../ngverse/src/lib/ui/input/input.directive';
import { TooltipDirective } from '../../../../../../ngverse/src/lib/ui/tooltip/tooltip.directive';

@Component({
  selector: 'doc-show-case-tooltip',
  imports: [TooltipDirective, ButtonComponent, InputDirective],
  templateUrl: './show-case-tooltip.component.html',
  styleUrl: './show-case-tooltip.component.css',
})
export class ShowCaseTooltipComponent {}
