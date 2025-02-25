import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../../../../../../ngverse/src/lib/icon/icon.component';
import { TabBodyDirective } from '../../../../../../ngverse/src/lib/tab/tab-body.directive';
import { TabGroupComponent } from '../../../../../../ngverse/src/lib/tab/tab-group.component';
import { TabHeaderDirective } from '../../../../../../ngverse/src/lib/tab/tab-header.directive';
import { TabComponent } from '../../../../../../ngverse/src/lib/tab/tab.component';
import { LazyTabComponent } from '../lazy-tab/lazy-tab.component';

@Component({
  selector: 'doc-show-case-tab',
  imports: [
    TabGroupComponent,
    TabComponent,
    TabBodyDirective,
    TabHeaderDirective,
    IconComponent,
    LazyTabComponent,
  ],
  templateUrl: './show-case-tab.component.html',
  styleUrl: './show-case-tab.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseTabComponent {}
