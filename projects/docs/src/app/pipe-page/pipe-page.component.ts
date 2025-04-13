import { CardComponent } from '@/ui/card/card.component';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import {
  ApiInputType,
  ApiPipeReturnType,
} from '../blueprint/api-info/api-inputs/api-inputs.component';
import { CommandInstallationComponent } from '../blueprint/command-installation/command-installation.component';
import { SourceTreeFolder } from '../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../blueprint/source-tree/source-tree.component';

@Component({
  selector: 'doc-pipe-page',
  imports: [CardComponent, SourceTreeComponent, CommandInstallationComponent],
  templateUrl: './pipe-page.component.html',
  styleUrl: './pipe-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipePageComponent {
  name = input.required<string>();
  subTitle = input.required<string>();
  fileName = input.required<string>();
  params = input.required<ApiInputType[]>();
  returns = input.required<ApiPipeReturnType>();
  pure = input(true);
  sourceTree = computed<SourceTreeFolder[]>(() => {
    return [
      {
        name: this.name(),
        hideName: true,
        files: [
          {
            name: `${this.fileName()}.pipe.ts`,
            path: `${this.fileName()}.pipe.ts`,
            language: 'ts',
          },
        ],
      },
    ];
  });
}
