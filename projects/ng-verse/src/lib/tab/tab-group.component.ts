import { animate, style, transition, trigger } from '@angular/animations';
import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  input,
  model,
  OnDestroy,
  output,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { ListboxItemDirective } from '../listbox/listbox-item.directive';
import { ListboxDirective } from '../listbox/listbox.directive';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tab-group',
  imports: [NgTemplateOutlet, ListboxDirective, ListboxItemDirective],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('tabChange', [
      transition('* => *', [
        style({ opacity: 0 }),
        animate('150ms ease-in', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class TabGroupComponent implements OnDestroy {
  tabs = contentChildren(TabComponent);
  selectedIndex = model(0);
  bodyGap = input(true);
  tabHeaders = viewChildren<ElementRef<HTMLElement>>('tabHeader');
  tabGroupHeader =
    viewChild.required<ElementRef<HTMLElement>>('tabGroupHeader');

  tabChanged = output<number>();

  selectedTab = computed(() =>
    this.tabs().find((_, index) => index === this.selectedIndex())
  );

  tabInkWidth = signal(0);
  tabInkLeft = signal(0);

  resizeObserver: ResizeObserver | undefined;

  constructor() {
    afterNextRender(() => {
      this.resizeObserver = new ResizeObserver(() => this.moveInk());
      this.resizeObserver.observe(this.tabGroupHeader().nativeElement);
    });
  }

  private moveInk() {
    const index = this.selectedIndex();
    const tabHeader = this.tabHeaders()[index];
    const tabGroupHeader = this.tabGroupHeader();
    if (tabHeader) {
      const rects = tabHeader.nativeElement.getBoundingClientRect();
      const tabGroupRects =
        tabGroupHeader.nativeElement.getBoundingClientRect();
      this.tabInkLeft.set(rects.left - tabGroupRects.left);
      this.tabInkWidth.set(rects.width);
    }
  }

  selectTab($event: number) {
    this.selectedIndex.set($event);
    this.tabChanged.emit($event);
    this.moveInk();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
