import { afterNextRender, Component, inject } from '@angular/core';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { DialogService } from '@ng-verse/dialog/dialog.service';

@Component({
  selector: 'doc-show-case-dialog',
  imports: [ButtonComponent],
  templateUrl: './show-case-dialog.component.html',
  styleUrl: './show-case-dialog.component.scss',
})
export class ShowCaseDialogComponent {
  dialogService = inject(DialogService);

  constructor() {
    afterNextRender(() => {
      this.showConfirm();
    });
  }

  showDialog() {}

  showConfirm() {
    this.dialogService.confirm({
      title: 'Immediate action',
      description: 'Please review the document',
    });
  }

  showAlert() {
    this.dialogService.alert({
      title: 'Immediate action',
      description: 'Please review the document',
      buttonLabel: 'OK',
    });
  }
}
