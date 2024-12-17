import { Component } from '@angular/core';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { TooltipDirective } from '@ng-verse/tooltip/tooltip.directive';

@Component({
  selector: 'doc-show-case-tooltip',
  imports: [TooltipDirective, ButtonComponent],
  templateUrl: './show-case-tooltip.component.html',
  styleUrl: './show-case-tooltip.component.scss',
})
export class ShowCaseTooltipComponent {}
