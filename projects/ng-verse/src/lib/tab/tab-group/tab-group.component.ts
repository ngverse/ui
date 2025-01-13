import {
  CdkListbox,
  CdkOption,
  ListboxValueChangeEvent,
} from '@angular/cdk/listbox';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  model,
} from '@angular/core';
import { TabComponent } from '../tab.component';

@Component({
  selector: 'app-tab-group',
  imports: [CdkPortalOutlet, CdkListbox, CdkOption],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabGroupComponent {
  tabs = contentChildren(TabComponent);
  selectedIndex = model(0);

  listboxValue = computed(() => [this.selectedIndex()]);

  selectedTab = computed(() =>
    this.tabs().find((_, index) => index === this.selectedIndex())
  );

  listboxValueChange($event: ListboxValueChangeEvent<number>) {
    const selectedIndex = $event.value[0];
    this.selectedIndex.set(selectedIndex);
  }
}
