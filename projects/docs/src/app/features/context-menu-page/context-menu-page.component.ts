import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCaseContextMenuComponent } from '../../examples/context-menu/show-case-context-menu/show-case-context-menu.component';

@Component({
  selector: 'doc-context-menu-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseContextMenuComponent,
    CommandInstallationComponent,
  ],
  templateUrl: './context-menu-page.component.html',
  styleUrl: './context-menu-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuPageComponent {}
