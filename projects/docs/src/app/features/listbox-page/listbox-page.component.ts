import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCaseListboxComponent } from '../../examples/listbox/show-case-listbox/show-case-listbox.component';

@Component({
  selector: 'doc-listbox-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseListboxComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
  ],
  templateUrl: './listbox-page.component.html',
  styleUrl: './listbox-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListboxPageComponent {}
