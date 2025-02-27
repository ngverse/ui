import { _IdGenerator } from '@angular/cdk/a11y';
import { inject, Injectable, signal } from '@angular/core';
import { BaseStack } from '../utils/base-stack';
import { A11yTabPanelDirective } from './tab-panel.directive';
import { A11yTabDirective } from './tab.directive';

@Injectable()
export class A11yTabStack extends BaseStack<A11yTabDirective> {
  private _panels = signal<A11yTabPanelDirective[]>([]);
  private groupId = inject(_IdGenerator).getId('kt-a11y-tab-group-');

  constructor() {
    super();

    this.toHorizontal();
    this.withWrap();
  }

  getTabId(tab: A11yTabDirective) {
    const index = this._items().indexOf(tab);
    return `${this.groupId}-tab-${index}`;
  }

  getTabIdByPanel(panel: A11yTabPanelDirective) {
    const tab = this._items()[this._panels().indexOf(panel)];
    return tab ? this.getTabId(tab) : '';
  }

  getPanelId(panel: A11yTabPanelDirective) {
    const index = this._panels().indexOf(panel);
    return `${this.groupId}-panel-${index}`;
  }

  getPanelIdByTab(tab: A11yTabDirective) {
    const panel = this._panels()[this._items().indexOf(tab)];
    return panel ? this.getPanelId(panel) : '';
  }

  genPanelId(current: A11yTabPanelDirective) {
    const length = this._panels().length;
    return `${current.id}-${length}`;
  }

  addPanel(panel: A11yTabPanelDirective) {
    this._panels.update((panels) => [...panels, panel]);
  }

  removePanel(panel: A11yTabPanelDirective) {
    this._panels.update((panels) => panels.filter((p) => p !== panel));
  }
}
