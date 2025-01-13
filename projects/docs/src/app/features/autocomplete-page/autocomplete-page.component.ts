import { Component, inject } from '@angular/core';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SourceTreeBuilder } from '../../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../../blueprint/source-tree/source-tree.component';
import { ShowCaseAutocompleteComponent } from '../../examples/autocomplete/show-case-autocomplete/show-case-autocomplete.component';

@Component({
  selector: 'doc-autocomplete-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseComponent,
    ApiInfoComponent,
    SourceTreeComponent,
    CommandInstallationComponent,
    ShowCaseAutocompleteComponent,
  ],
  templateUrl: './autocomplete-page.component.html',
  styleUrl: './autocomplete-page.component.scss',
})
export class AutocompletePageComponent {
  sourceTreeBuilder = inject(SourceTreeBuilder);
  sourceTree = this.sourceTreeBuilder.sourceTree('autocomplete', (root) => [
    this.sourceTreeBuilder.folder(
      root,
      root,
      () => this.sourceTreeBuilder.fullComponent('autocomplete', root),
      true
    ),
  ]);
}
