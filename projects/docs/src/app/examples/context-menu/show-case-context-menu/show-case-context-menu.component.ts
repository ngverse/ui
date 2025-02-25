import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ContextMenuItemDirective } from '../../../../../../ngverse/src/lib/context-menu/context-menu-item.directive';
import { ContextMenuTriggerDirective } from '../../../../../../ngverse/src/lib/context-menu/context-menu-trigger.directive';
import { ContextMenuDirective } from '../../../../../../ngverse/src/lib/context-menu/context-menu.directive';
import { ToastService } from '../../../../../../ngverse/src/lib/toast/toast.service';

@Component({
  selector: 'doc-show-case-context-menu',
  imports: [
    ContextMenuDirective,
    ContextMenuTriggerDirective,
    ContextMenuItemDirective,
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

  copy(text?: string | null) {
    if (!text) {
      return;
    }
    navigator.clipboard.writeText(text).then(() => {
      this.toast.open({
        message: 'Copied!',
        showCloseIcon: false,
        closeDelay: 1000,
      });
    });
  }
}
