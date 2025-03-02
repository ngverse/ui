import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  A11yTabDirective,
  A11yTabGroupDirective,
  A11yTabListDirective,
  A11yTabPanelDirective,
} from '@ngverse/kit';

@Component({
  selector: 'doc-show-case-a11y-tab',
  imports: [
    A11yTabDirective,
    A11yTabPanelDirective,
    A11yTabGroupDirective,
    A11yTabListDirective,
  ],
  templateUrl: './show-case-a11y-tab.component.html',
  styleUrl: './show-case-a11y-tab.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseA11yTabComponent {
  epxandedIndex = signal(0);

  tabs = [
    {
      label: 'Tab 1',
      body: 'Body 1',
    },
    {
      label: 'Tab 2',
      body: 'Body 2',
    },
  ];

  toggle(index: number) {
    this.epxandedIndex.set(index);
  }
}
