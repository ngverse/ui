import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@ng-verse/icon/icon.component';
import { TabBodyDirective } from '@ng-verse/tab/tab-body.directive';
import { TabGroupComponent } from '@ng-verse/tab/tab-group.component';
import { TabHeaderDirective } from '@ng-verse/tab/tab-header.directive';
import { TabComponent } from '@ng-verse/tab/tab.component';
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
  styleUrl: './show-case-tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseTabComponent {}
