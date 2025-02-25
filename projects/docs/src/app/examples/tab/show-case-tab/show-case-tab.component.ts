import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '../../../../../../ngverse/src/lib/ui/icon/icon.component';
import { TabBodyDirective } from '../../../../../../ngverse/src/lib/ui/tab/tab-body.directive';
import { TabGroupComponent } from '../../../../../../ngverse/src/lib/ui/tab/tab-group.component';
import { TabHeaderDirective } from '../../../../../../ngverse/src/lib/ui/tab/tab-header.directive';
import { TabComponent } from '../../../../../../ngverse/src/lib/ui/tab/tab.component';
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
