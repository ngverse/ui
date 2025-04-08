import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../../blueprint/command-installation/command-installation.component';
import {
  Prerequisite,
  PrerequisitesComponent,
} from '../../../blueprint/prerequisites/prerequisites.component';
import { ShowCaseComponent } from '../../../blueprint/show-case/show-case.component';
import { SourceTreeFolder } from '../../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../../blueprint/source-tree/source-tree.component';
import { ShowCaseMultiSelectComponent } from '../../../examples/multi-select/show-case-multi-select/show-case-multi-select.component';

@Component({
  selector: 'doc-multi-select-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseMultiSelectComponent,
    CommandInstallationComponent,
    PrerequisitesComponent,
    SourceTreeComponent,
    ApiInfoComponent,
  ],
  templateUrl: './multi-select-page.component.html',
  styleUrl: './multi-select-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiSelectPageComponent {
  prerequisites: Prerequisite[] = [
    {
      name: 'popover',
      label: 'Popover',
    },
  ];

  sourceTree: SourceTreeFolder[] = [];

  apiInfo: ApiInfo = {
    entities: [],
  };
}
