import { Component } from '@angular/core';
import { ButtonComponent } from '@ngverse/button/button.component';
import { InputComponent } from '@ngverse/input/input.component';
import { TooltipDirective } from '@ngverse/tooltip/tooltip.directive';

@Component({
  selector: 'doc-show-case-tooltip',
  imports: [TooltipDirective, ButtonComponent, InputComponent],
  templateUrl: './show-case-tooltip.component.html',
  styleUrl: './show-case-tooltip.component.scss',
})
export class ShowCaseTooltipComponent {}
