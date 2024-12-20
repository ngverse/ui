import { Component, signal } from '@angular/core';
import { TabBodyDirective } from '../../../../../ng-verse/src/lib/tab/tab-body.directive';
import { TabGroupComponent } from '../../../../../ng-verse/src/lib/tab/tab-group/tab-group.component';
import { TabComponent } from '../../../../../ng-verse/src/lib/tab/tab.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';

@Component({
  selector: 'test-tab',
  template: ``,
})
export class TestTab {
  constructor() {
    console.log('EXECUTED');
  }
}

@Component({
  selector: 'doc-tab-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    TabGroupComponent,
    TabComponent,
    TabBodyDirective,
    TestTab,
  ],
  templateUrl: './tab-page.component.html',
  styleUrl: './tab-page.component.scss',
})
export class TabPageComponent {
  selectedIndex = signal(0);

  date() {
    return new Date().toTimeString();
  }

  constructor() {
    // setTimeout(() => {
    //   this.selectedIndex.set(1);
    // }, 2000);
  }
}
