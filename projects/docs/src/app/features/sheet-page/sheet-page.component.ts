import { Component, inject } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseSheetComponent } from '../../examples/sheet/show-case-sheet/show-case-sheet.component';
const ROOT = 'sheet';
@Component({
  selector: 'doc-sheet-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ShowCaseSheetComponent,
  ],
  templateUrl: './sheet-page.component.html',
  styleUrl: './sheet-page.component.scss',
})
export class SheetPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  sourceTree: SourceTreeFolder[] = [
    /*{
      name: 'sheet',
      files: [...this.sourceTreeBuilder.file(ROOT, ROOT)],
      hideName: true,
    },*/
  ];

  apiInfo: ApiInfo = {
    entities: [],
    description: `The Skeleton component is an placeholder used to indicate loading content.
    It can be styled with CSS to customize its size, shape.`,
  };
}
