import { Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCaseTooltipComponent } from '../../examples/tooltip/show-case-tooltip/show-case-tooltip.component';

@Component({
  selector: 'doc-tooltip-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    ShowCaseTooltipComponent,
  ],
  templateUrl: './tooltip-page.component.html',
  styleUrl: './tooltip-page.component.scss',
})
export class TooltipPageComponent {}
