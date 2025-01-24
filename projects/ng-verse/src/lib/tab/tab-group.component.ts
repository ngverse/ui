import { animate, style, transition, trigger } from '@angular/animations';
import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
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
  model,
  OnDestroy,
  output,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import { RovingListboxDirective } from '../roving-listbox/roving-listbox.directive';
import { TabGroupHeaderItemComponent } from './tab-group-header-item.component';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tab-group',
  imports: [
    NgTemplateOutlet,
    TabGroupHeaderItemComponent,
    RovingListboxDirective,
  ],
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
  tabHeaders = viewChildren<TabGroupHeaderItemComponent>(
    TabGroupHeaderItemComponent
  );
  tabGroupHeader =
    viewChild.required<ElementRef<HTMLElement>>('tabGroupHeader');

  tabChanged = output<number>();

  selectedTab = computed(() =>
    this.tabs().find((_, index) => index === this.selectedIndex())
  );

  keyManager = new ActiveDescendantKeyManager(
    this.tabHeaders,
    inject(Injector)
  ).withHorizontalOrientation('ltr');

  tabInkWidth = signal(0);
  tabInkLeft = signal(0);

  resizeObserver: ResizeObserver | undefined;

  constructor() {
    afterNextRender(() => {
      this.resizeObserver = new ResizeObserver(() => this.moveInk());
      this.resizeObserver.observe(this.tabGroupHeader().nativeElement);
    });

    this.keyManager.tabOut.subscribe(() => {
      this.keyManager.setActiveItem(-1);
    });
  }

  onKeydown($event: KeyboardEvent) {
    if ($event.key === 'Enter') {
      const foundIndex = this.tabHeaders().findIndex(
        (tabHeader) => tabHeader === this.keyManager.activeItem
      );
      if (foundIndex !== -1) {
        this.selectTab(foundIndex);
      }
    }
    this.keyManager.onKeydown($event);
  }

  private moveInk() {
    const index = this.selectedIndex();
    const tabHeader = this.tabHeaders()[index];
    const tabGroupHeader = this.tabGroupHeader();
    if (tabHeader) {
      const rects = tabHeader.el.getBoundingClientRect();
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
    this.keyManager.destroy();
    this.resizeObserver?.disconnect();
  }
}
