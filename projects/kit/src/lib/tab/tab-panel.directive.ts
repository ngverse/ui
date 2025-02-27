import { computed, Directive, inject, OnDestroy } from '@angular/core';
import { A11yTabStack } from './tab-stack';

@Directive({
  selector: '[ktA11yTabPanel]',
  providers: [],
  host: {
    role: 'tabpanel',
    '[id]': 'id()',
    '[attr.aria-labelledby]': 'tabId()',
  },
})
export class A11yTabPanelDirective implements OnDestroy {
  private registry = inject(A11yTabStack);

  id = computed(() => this.registry.getPanelId(this));
  tabId = computed(() => this.registry.getTabIdByPanel(this));

  constructor() {
    this.registry.addPanel(this);
  }

  ngOnDestroy(): void {
    this.registry.removePanel(this);
  }
}
