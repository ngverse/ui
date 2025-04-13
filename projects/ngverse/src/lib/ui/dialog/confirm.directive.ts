import { Directive, inject, input, output } from '@angular/core';
import { DialogService } from './dialog.service';
import { ConfirmDialogOptions } from './confirm-dialog/confirm-dialog.component';

@Directive({
  selector: '[appConfirm]',
  host: {
    '(click)': 'open()',
  },
})
export class ConfirmDirective {
  confirmOptions = input.required<ConfirmDialogOptions>();

  approved = output();
  rejected = output();

  private dialogService = inject(DialogService);

  open() {
    this.dialogService
      .confirm(this.confirmOptions())
      .closed.subscribe((result) => {
        if (result) {
          this.approved.emit();
        } else {
          this.rejected.emit();
        }
      });
  }
}
