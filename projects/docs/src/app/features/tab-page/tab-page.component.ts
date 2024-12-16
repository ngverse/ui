import { Component } from '@angular/core';
import { TabGroupComponent } from '../../../../../ng-verse/src/lib/tab/tab-group/tab-group.component';
import { TabComponent } from '../../../../../ng-verse/src/lib/tab/tab.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';

@Component({
  selector: 'doc-tab-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    TabGroupComponent,
    TabComponent,
  ],
  templateUrl: './tab-page.component.html',
  styleUrl: './tab-page.component.scss',
})
export class TabPageComponent {}
