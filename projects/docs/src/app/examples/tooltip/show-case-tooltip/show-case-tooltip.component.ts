import { ButtonComponent } from '@/ui/button/button.component';
import { InputDirective } from '@/ui/input/input.directive';
import { TooltipDirective } from '@/ui/tooltip/tooltip.directive';
import { Component } from '@angular/core';

@Component({
  selector: 'doc-show-case-tooltip',
  imports: [TooltipDirective, ButtonComponent, InputDirective],
  templateUrl: './show-case-tooltip.component.html',
  styleUrl: './show-case-tooltip.component.css',
})
export class ShowCaseTooltipComponent {}
