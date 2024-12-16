import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import { CdkPortalOutlet } from '@angular/cdk/portal';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  ElementRef,
  model,
  viewChild,
  viewChildren,
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
          this.selectedIndex();
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

  selectTab() {
    // this.selectedIndex.set(tabIndex[0]);
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
