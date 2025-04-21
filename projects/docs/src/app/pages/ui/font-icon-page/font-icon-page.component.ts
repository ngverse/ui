import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ApiInfo,
  ApiInfoComponent,
} from '../../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../../blueprint/show-case/show-case.component';
import {
  SourceTreeBuilder,
  SourceTreeFolder,
} from '../../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../../blueprint/source-tree/source-tree.component';
import { ShowCaseFontIconComponent } from '../../../examples/font-icon/show-case-font-icon/show-case-font-icon.component';

const ROOT = 'font-icon';

@Component({
  selector: 'doc-font-icon-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseFontIconComponent,
    CommandInstallationComponent,
    SourceTreeComponent,
    ApiInfoComponent,
  ],
  templateUrl: './font-icon-page.component.html',
  styleUrl: './font-icon-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FontIconPageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree: SourceTreeFolder[] = [
    {
      name: ROOT,
      files: [...this.sourceTreeBuilder.fullInlineComponent('font-icon', ROOT)],
      hideName: true,
    },
  ];
  apiInfo: ApiInfo = {
    ariaLink:
      'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/img_role',
    entities: [
      {
        name: 'FontIconComponent',
        type: 'component',
        selector: 'app-font-icon',
        inputs: [
          {
            name: 'ng-content',
            type: 'ng-content',
            description: 'The name of the icon to display.',
          },
          {
            name: 'size',
            type: 'number | string',
            default: '24px',
            description: 'The size of the icon.',
          },
          {
            name: 'fill',
            type: 'boolean',
            description: 'Whether the icon should be filled.',
            default: 'false',
          },
          {
            name: 'variant',
            type: 'outlined | rounded | sharp',
            default: 'outlined',
            description: 'The variant of the icon.',
          },
        ],
      },
    ],
  };
}
