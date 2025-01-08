import { ActiveDescendantKeyManager } from '@angular/cdk/a11y';
import {
  AfterContentInit,
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
  QueryList,
  signal,
  viewChild,
} from '@angular/core';
import { PopoverComponent } from '@ng-verse/popover/popover.component';
import { ContextMenuItemComponent } from './context-menu-item/context-menu-item.component';
import { ContextMenuTriggerDirective } from './context-menu-trigger.directive';
import { CONTEXT_MENU_ANIMATIONS } from './context-menu.animations';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrl: './context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    tabIndex: '0',
  },
  animations: [CONTEXT_MENU_ANIMATIONS],
})
export class ContextMenuComponent implements OnInit, AfterContentInit {
  animationState = signal<'show' | 'hide'>('show');
  trigger = input.required<ContextMenuTriggerDirective>();

  @ContentChildren(ContextMenuItemComponent, { descendants: true })
  items!: QueryList<ContextMenuItemComponent>;

  keyManager!: ActiveDescendantKeyManager<ContextMenuItemComponent>;

  popover = viewChild.required(PopoverComponent);

  host = inject(ElementRef<HTMLElement>);

  @HostListener('keydown', ['$event'])
  onKeydown($event: KeyboardEvent) {
    this.keyManager.onKeydown($event);
  }

  event = signal<MouseEvent | undefined>(undefined);

  constructor() {
    afterRenderEffect({
      write: () => {
        const $event = this.event();
        if ($event) {
          // this.popover().open({
          //   x: $event.clientX,
          //   y: $event.clientY,
          // });
        }
      },
    });
  }

  ngOnInit(): void {
    this.trigger().openTriggered.subscribe(($event) => {
      $event.stopPropagation();
      $event.preventDefault();
      this.event.set($event);
    });
  }

  opened() {
    console.log('OPENED');
    this.host.nativeElement.focus();
    this.keyManager.setFirstItemActive();
  }

  ngAfterContentInit(): void {
    this.keyManager = new ActiveDescendantKeyManager(this.items).withWrap();
  }
}
