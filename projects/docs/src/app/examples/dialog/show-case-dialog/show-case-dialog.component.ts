import { Component, inject } from '@angular/core';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { ConfirmDirective } from '@ng-verse/dialog/confirm.directive';
import { DialogService } from '@ng-verse/dialog/dialog.service';
import { DialogTestComponent } from '../dialog-test/dialog-test.component';

@Component({
  selector: 'doc-show-case-dialog',
  imports: [ButtonComponent, ConfirmDirective],
  templateUrl: './show-case-dialog.component.html',
  styleUrl: './show-case-dialog.component.scss',
})
export class ShowCaseDialogComponent {
  dialogService = inject(DialogService);

  showDialog() {
    this.dialogService.dialog(DialogTestComponent, {
      title: 'Fill the user data',
    });
  }

  showConfirm() {
    this.dialogService.confirm({
      title: 'Are you sure?',
      description: 'It will delete user data',
    });
  }

  showAlert() {
    this.dialogService.alert({
      title: 'Immediate action',
      description: 'Please review the document',
      buttonLabel: 'OK',
    });
  }

  deleteItem() {
    setTimeout(() => {
      alert('Delete item');
    });
  }
}
