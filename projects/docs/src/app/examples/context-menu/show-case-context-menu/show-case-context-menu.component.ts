import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { ContextMenuItemComponent } from '@ngverse/context-menu/context-menu-item.component';
import { ContextMenuTriggerDirective } from '@ngverse/context-menu/context-menu-trigger.directive';
import { ContextMenuComponent } from '@ngverse/context-menu/context-menu.component';
import { ToastService } from '@ngverse/toast/toast.service';

@Component({
  selector: 'doc-show-case-context-menu',
  imports: [
    ContextMenuComponent,
    ContextMenuTriggerDirective,
    ContextMenuItemComponent,
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
