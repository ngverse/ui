import { animate, style, transition, trigger } from '@angular/animations';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import { Directionality } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  ElementRef,
  inject,
  Injector,
  input,
  model,
  OnDestroy,
  output,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { TabGroupHeaderComponent } from './tab-group-header.component';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tab-group',
  imports: [NgTemplateOutlet, TabGroupHeaderComponent],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.css',
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

  tabHeaders = viewChildren(TabGroupHeaderComponent);

  tabHeadersEl = computed(() =>
    this.tabHeaders().map((tabHeader) => tabHeader.element)
  );

  tabGroupHeader =
    viewChild.required<ElementRef<HTMLElement>>('tabGroupHeader');

  direction = inject(Directionality);

  keyManager = new ActiveDescendantKeyManager(
    this.tabHeaders,
    inject(Injector)
  ).withHorizontalOrientation(this.direction.value);

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.keyManager.activeItemIndex !== null) {
      this.selectTab(this.keyManager.activeItemIndex);
    }
    this.keyManager.onKeydown(event);
  }

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

  onTabGroupFocus() {
    if (!this.keyManager.activeItem) {
      this.keyManager.setFirstItemActive();
    }
  }

  private moveInk() {
    const index = this.selectedIndex();
    const tabHeader = this.tabHeadersEl()[index];
    const tabGroupHeader = this.tabGroupHeader();
    if (tabHeader) {
      const rects = tabHeader.getBoundingClientRect();
      const tabGroupRects =
        tabGroupHeader.nativeElement.getBoundingClientRect();
      this.tabInkLeft.set(rects.left - tabGroupRects.left);
      this.tabInkWidth.set(rects.width);
    }
  }

  selectTab($event: number) {
    this.keyManager.setActiveItem($event);
    this.selectedIndex.set($event);
    this.tabChanged.emit($event);
    this.moveInk();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
  }
}
