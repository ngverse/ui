import {
  AfterContentChecked,
  AfterContentInit,
  afterNextRender,
  afterRender,
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  ElementRef,
  input,
  model,
  viewChild,
  viewChildren,
} from '@angular/core';
import { TabComponent } from '../tab.component';
import { CdkPortalOutlet } from '@angular/cdk/portal';

@Component({
  selector: 'app-tab-group',
  imports: [CdkPortalOutlet],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabGroupComponent {
  tabs = contentChildren(TabComponent);
  selectedIndex = model(0);

  tabHeaders = viewChildren('tabHeader', { read: ElementRef<HTMLElement> });

  tabMainHeader = viewChild('tabMainHeader', { read: ElementRef<HTMLElement> });

  tabInk = viewChildren('tabInk', { read: ElementRef<HTMLElement> });

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

          const tabInk = this.tabInk()[0]?.nativeElement;
          if (tabHeader && tabMainHeader && tabInk) {
            const tabRect = tabHeader.getBoundingClientRect();
            const tabsRect = tabMainHeader.getBoundingClientRect();

            tabInk.style.width = `${tabRect.width}px`;
            tabInk.style.left = `${tabRect.left - tabsRect.left}px`;
          }
        },100);
      },
    });
  }

  inkPosition = computed(() => {});

  selectTab(tabIndex: number) {
    this.selectedIndex.set(tabIndex);
    this.moveInk();
  }

  private moveInk() {}
}
