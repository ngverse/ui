import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ContextMenuItemComponent } from '@ng-verse/context-menu/context-menu-item/context-menu-item.component';
import { ContextMenuTriggerDirective } from '@ng-verse/context-menu/context-menu-trigger.directive';
import { ContextMenuComponent } from '@ng-verse/context-menu/context-menu.component';
import { ToastService } from '@ng-verse/toast/toast.service';

@Component({
  selector: 'doc-show-case-context-menu',
  imports: [
    ContextMenuComponent,
    ContextMenuTriggerDirective,
    ContextMenuItemComponent,
    CdkCopyToClipboard,
  ],
  templateUrl: './show-case-context-menu.component.html',
  styleUrl: './show-case-context-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowCaseContextMenuComponent {
  private toast = inject(ToastService);

  color = signal('inherit');

  markRead() {
    this.color.set('red');
  }

  copied() {
    this.toast.open({
      message: 'Copied!',
      showCloseIcon: false,
      closeDelay: 1000,
    });
  }

  selected() {
    console.log('SELECTED');
  }
}
