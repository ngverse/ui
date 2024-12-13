import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  model,
  viewChild,
  viewChildren,
} from '@angular/core';
import { TabComponent } from '../tab.component';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';

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

  tabHeaders = viewChildren('tabHeader', { read: ElementRef<HTMLElement> });

  tabMainHeader = viewChild('tabMainHeader', { read: ElementRef<HTMLElement> });

  tabInk = viewChild('tabInk', { read: ElementRef<HTMLElement> });

  isSelected(tabIndex: number) {
    return this.selectedIndex() === tabIndex;
  }

  constructor() {
    afterNextRender({
      mixedReadWrite: () => {
        setTimeout(() => {
          const _ = this.selectedIndex();
          const tabMainHeader = this.tabMainHeader()?.nativeElement;
          const tabHeader = this.tabHeaders()[0].nativeElement;

          const tabInk = this.tabInk()?.nativeElement;
          if (tabHeader && tabMainHeader && tabInk) {
            const tabRect = tabHeader.getBoundingClientRect();
            const tabsRect = tabMainHeader.getBoundingClientRect();

            tabInk.style.width = `${tabRect.width}px`;
            tabInk.style.left = `${tabRect.left - tabsRect.left}px`;
          }
        }, 500);
      },
    });
  }

  inkPosition = computed(() => {});

  selectTab(tabIndex: any) {
    this.selectedIndex.set(tabIndex[0]);
    this.moveInk();
  }

  private moveInk() {
    const selectedIndex = this.selectedIndex();
    const tabMainHeader = this.tabMainHeader()?.nativeElement;
    const tabHeader = this.tabHeaders()[selectedIndex].nativeElement;

    const tabInk = this.tabInk()?.nativeElement;
    if (tabHeader && tabMainHeader && tabInk) {
      const tabRect = tabHeader.getBoundingClientRect();
      const tabsRect = tabMainHeader.getBoundingClientRect();

      tabInk.style.width = `${tabRect.width}px`;
      tabInk.style.left = `${tabRect.left - tabsRect.left}px`;
    }
  }
}
