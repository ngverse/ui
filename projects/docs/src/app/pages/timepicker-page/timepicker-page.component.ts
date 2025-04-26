import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCaseTimepickerComponent } from '../../examples/timepicker/show-case-timepicker/show-case-timepicker.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';

const ROOT = 'timepicker';

@Component({
  selector: 'doc-timepicker-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    ShowCaseTimepickerComponent,
    ApiInfoComponent,
    SourceTreeComponent,
  ],
  templateUrl: './timepicker-page.component.html',
  styleUrl: './timepicker-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimepickerPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  sourceTree: SourceTreeFolder[] = [
    {
      name: 'timepicker',
      files: [...this.sourceTreeBuilder.inlineComponent(ROOT, ROOT)],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'TimepickerComponent',
        type: 'component',
        selector: 'app-timepicker',
        description: `Provides UI for selecting a time`,
        formBindable: true,
      },
    ],
  };
}
