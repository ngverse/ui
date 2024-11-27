import { CommonModule } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  inject,
  QueryList,
  viewChildren,
  ViewChildren,
} from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';

@Component({
  selector: 'doc-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent implements AfterContentInit {
  @ViewChildren('labelItem', { read: ElementRef })
  labelItems!: QueryList<ElementRef<HTMLElement>>;

  @ContentChildren(TabItemComponent) tabs!: QueryList<TabItemComponent>;
  cf = inject(ChangeDetectorRef);

  inkBarStyles = {};

  selectedTab: TabItemComponent | undefined;

  get headers() {
    return this.tabs.map((tab) => tab.label);
  }

  get selectedIndex() {
    return this.tabs.toArray().findIndex((tab) => tab === this.selectedTab);
  }

  selectTab(header: string) {
    const foundTab = this.tabs.find((tab) => tab.label() === header);
    if (foundTab) {
      this.selectedTab = foundTab;
      this.updateInkBar();
      this.cf.markForCheck();
    }
  }

  ngAfterContentInit(): void {
    requestAnimationFrame(() => {
      this.selectTab(this.tabs.first.label());
    });
  }

  updateInkBar() {
    const el = this.labelItems.get(this.selectedIndex)?.nativeElement;

    if (el) {
      this.inkBarStyles = {
        left: `${el.offsetLeft}px`,
        width: `${el.clientWidth}px`,
        bottom: 0,
      };
    }
  }
}
