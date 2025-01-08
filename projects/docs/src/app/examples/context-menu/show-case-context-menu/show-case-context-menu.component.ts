import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContextMenuItemComponent } from '@ng-verse/context-menu/context-menu-item/context-menu-item.component';
import { ContextMenuTriggerDirective } from '@ng-verse/context-menu/context-menu-trigger.directive';
import { ContextMenuComponent } from '@ng-verse/context-menu/context-menu.component';

@Component({
  selector: 'doc-show-case-context-menu',
  imports: [ContextMenuComponent, ContextMenuTriggerDirective, ContextMenuItemComponent],
  templateUrl: './show-case-context-menu.component.html',
  styleUrl: './show-case-context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseContextMenuComponent {}
