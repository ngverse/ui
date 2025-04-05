import { Highlightable } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tab-group-header',
  imports: [NgTemplateOutlet],
  template: `@if (tab().headerTemplate(); as headerTemplate) {
      <ng-container
        [ngTemplateOutlet]="headerTemplate.templateRef"
      ></ng-container>
    } @else {
      {{ tab().label() }}
    } `,
  styles: `
    :host {
      padding: 12px 16px;
      display: flex;
      justify-content: center;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      &.selected {
        border-bottom-color: var(--color-primary);
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.is-active]': 'enabledTabIndex()',
    '[class.selected]': 'isSelected()',
  },
})
export class TabGroupHeaderComponent implements Highlightable {
  disabled?: boolean | undefined;

  activate = signal(false);

  tab = input.required<TabComponent>();
  element = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>)
    .nativeElement;
  enabledTabIndex = signal(false);
  isSelected = input.required<boolean>();

  setActiveStyles(): void {
    this.enabledTabIndex.set(true);
    this.element.focus();
  }
  setInactiveStyles(): void {
    this.enabledTabIndex.set(false);
  }
}
