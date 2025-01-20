import { Highlightable } from '@angular/cdk/a11y';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-tab-group-header-item',
  imports: [NgTemplateOutlet],
  templateUrl: './tab-group-header-item.component.html',
  styleUrl: './tab-group-header-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabGroupHeaderItemComponent implements Highlightable {
  isActive = signal(false);

  tab = input.required<TabComponent>();
  host = inject(ElementRef<HTMLElement>);
  selectTab = output();
  get el() {
    return this.host.nativeElement;
  }

  setActiveStyles(): void {
    this.isActive.set(true);
  }
  setInactiveStyles(): void {
    this.isActive.set(false);
  }
}
