import { DialogRef } from '@angular/cdk/dialog';
import { Directive, inject, input } from '@angular/core';

@Directive({
  selector: '[appDialogClose]',
  host: {
    '(click)': 'onClick()',
  },
})
export class DialogCloseDirective {
  dialogRef = inject(DialogRef);

  value = input<unknown>(undefined, { alias: 'appDialogClose' });

  onClick() {
    this.dialogRef.close(this.value());
  }
}
