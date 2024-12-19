import { afterNextRender, Component, inject } from '@angular/core';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { DialogService } from '@ng-verse/dialog/dialog.service';
import { ShowCaseTooltipComponent } from '../../tooltip/show-case-tooltip/show-case-tooltip.component';

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
      this.showDialog();
    });
  }

  showDialog() {
    this.dialogService.open(ShowCaseTooltipComponent, {
      title: 'Test dialog',
    });
  }

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
