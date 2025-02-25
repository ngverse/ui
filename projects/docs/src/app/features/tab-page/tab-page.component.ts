import { Component, inject, signal } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseTabComponent } from '../../examples/tab/show-case-tab/show-case-tab.component';
const ROOT = 'tab';
@Component({
  selector: 'doc-tab-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseTabComponent,
    SourceTreeComponent,
    ApiInfoComponent,
  ],
  templateUrl: './tab-page.component.html',
  styleUrl: './tab-page.component.css',
})
export class TabPageComponent {
  selectedIndex = signal(0);
  sourceTreeBuilder = inject(SourceTreeBuilder);

  apiInfo: ApiInfo = {
    entities: [
      {
        name: 'TabGroupComponent',
        type: 'component',
        selector: 'app-tab-group',
      },
      {
        name: 'TabComponent',
        type: 'component',
        selector: 'app-tab',
      },
      {
        name: 'TabBodyDirective',
        type: 'directive',
        selector: '[appTabBody]',
      },
      {
        name: 'TabHeaderDirective',
        type: 'directive',
        selector: '[appTabHeader]',
      },
    ],
  };

  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [
        ...this.sourceTreeBuilder.fullComponent(ROOT, ROOT),
        ...this.sourceTreeBuilder.fullInlineComponent('tab-group-header', ROOT),
        ...this.sourceTreeBuilder.fullComponent('tab-group', ROOT),
        ...this.sourceTreeBuilder.directive('tab-body', ROOT),
        ...this.sourceTreeBuilder.directive('tab-header', ROOT),
      ],
      hideName: true,
    },
  ];
}
