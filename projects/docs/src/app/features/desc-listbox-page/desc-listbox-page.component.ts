import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCaseDescListboxComponent } from '../../examples/desc-listbox/show-case-desc-listbox/show-case-desc-listbox.component';

@Component({
  selector: 'doc-desc-listbox-page',
  imports: [
    BlueprintPageComponent,
    CommandInstallationComponent,
    ShowCaseComponent,
    ApiInfoComponent,
    ShowCaseDescListboxComponent,
  ],
  templateUrl: './desc-listbox-page.component.html',
  styleUrl: './desc-listbox-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DescListboxPageComponent {
  apiInfo: ApiInfo = {
    entities: [],
  };
}
