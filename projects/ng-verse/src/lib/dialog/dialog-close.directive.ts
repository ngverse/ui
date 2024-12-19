import { DialogRef } from '@angular/cdk/dialog';
import { Directive, HostListener, inject, input } from '@angular/core';

@Directive({
  selector: '[appDialogClose]',
})
export class DialogCloseDirective {
  dialogRef = inject(DialogRef);

  value = input<unknown>(undefined, { alias: 'appDialogClose' });

  @HostListener('click')
  onClick() {
    this.dialogRef.close(this.value());
  }
}
