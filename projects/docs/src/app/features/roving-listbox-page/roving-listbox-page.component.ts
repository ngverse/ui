import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCaseRovingListboxComponent } from '../../examples/roving-listbox/show-case-roving-listbox/show-case-roving-listbox.component';

@Component({
  selector: 'doc-roving-listbox-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    ApiInfoComponent,
    ShowCaseRovingListboxComponent,
  ],
  templateUrl: './roving-listbox-page.component.html',
  styleUrl: './roving-listbox-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RovingListboxPageComponent {
  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'RovingListboxComponent',
        type: 'component',
      },
    ],
  };
}
