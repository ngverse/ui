import { Component } from '@angular/core';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import { ApiInputsComponent } from '../../blueprint/api-info/api-inputs/api-inputs.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { TooltipDirective } from '../../../../../ng-verse/src/lib/tooltip/tooltip.directive';
import { ShowCaseTooltipComponent } from '../../../../../examples/src/lib/tooltip/show-case-tooltip/show-case-tooltip.component';

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
