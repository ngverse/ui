import { TabBodyDirective } from '@/ui/tab/tab-body.directive';
import { TabGroupComponent } from '@/ui/tab/tab-group.component';
import { TabHeaderDirective } from '@/ui/tab/tab-header.directive';
import { TabComponent } from '@/ui/tab/tab.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LazyTabComponent } from '../lazy-tab/lazy-tab.component';

@Component({
  selector: 'doc-show-case-tab',
  imports: [
    TabGroupComponent,
    TabComponent,
    TabBodyDirective,
    TabHeaderDirective,
    LazyTabComponent,
  ],
  templateUrl: './show-case-tab.component.html',
  styleUrl: './show-case-tab.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseTabComponent {}
