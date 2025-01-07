import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCasePopoverComponent } from '../../examples/popover/show-case-popover/show-case-popover.component';

@Component({
  selector: 'doc-popover-page',
  imports: [
    ShowCasePopoverComponent,
    BlueprintPageComponent,
    ShowCaseComponent,
  ],
  templateUrl: './popover-page.component.html',
  styleUrl: './popover-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverPageComponent {}
