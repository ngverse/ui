import { Component } from '@angular/core';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { InputComponent } from '@ng-verse/input/input.component';
import { TooltipDirective } from '@ng-verse/tooltip/tooltip.directive';

@Component({
  selector: 'doc-show-case-tooltip',
  imports: [TooltipDirective, ButtonComponent, InputComponent],
  templateUrl: './show-case-tooltip.component.html',
  styleUrl: './show-case-tooltip.component.scss',
})
export class ShowCaseTooltipComponent {}
