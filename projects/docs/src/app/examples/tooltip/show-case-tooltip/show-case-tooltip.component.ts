import { Component } from '@angular/core';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { InputDirective } from '@ng-verse/input/input.directive';
import { TooltipDirective } from '@ng-verse/tooltip/tooltip.directive';

@Component({
  selector: 'doc-show-case-tooltip',
  imports: [TooltipDirective, ButtonComponent, InputDirective],
  templateUrl: './show-case-tooltip.component.html',
  styleUrl: './show-case-tooltip.component.scss',
})
export class ShowCaseTooltipComponent {}
