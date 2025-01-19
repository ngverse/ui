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
import { ShowCaseDrawerComponent } from '../../examples/drawer/show-case-drawer/show-case-drawer.component';
const ROOT = 'drawer';
@Component({
  selector: 'doc-drawer-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
    ShowCaseDrawerComponent,
  ],
  templateUrl: './drawer-page.component.html',
  styleUrl: './drawer-page.component.scss',
})
export class DrawerPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);

  sourceTree: SourceTreeFolder[] = [
    {
      name: 'drawer',
      files: [...this.sourceTreeBuilder.fullComponent(ROOT, ROOT)],
      hideName: true,
    },
  ];

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'DrawerComponent',
        type: 'component',
        selector: 'app-drawer',
      },
    ],
    description: `The Drawer component is an placeholder used to indicate loading content.
    It can be styled with CSS to customize its size, shape.`,
  };
}
