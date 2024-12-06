import { Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { TabGroupComponent } from '../../../../../ng-verse/src/lib/tab/tab-group/tab-group.component';
import { TabComponent } from '../../../../../ng-verse/src/lib/tab/tab.component';
import { TabBodyDirective } from '../../../../../ng-verse/src/lib/tab/tab-body.directive';

@Component({
  selector: 'test-c',
  template: `HELLO`,
})
export class TestC {
  constructor() {
    console.log('HELLO');
  }
}
@Component({
  selector: 'doc-tab-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    TabGroupComponent,
    TabComponent,
    TestC,
    TabBodyDirective,
  ],
  templateUrl: './tab-page.component.html',
  styleUrl: './tab-page.component.scss',
})
export class TabPageComponent {}
