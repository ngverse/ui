import { Component, inject } from '@angular/core';
import { DialogService } from '../../../../../ng-verse/src/lib/dialog/dialog.service';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';

@Component({
  selector: 'doc-dialog-page',
  imports: [BlueprintPageComponent, ShowCaseComponent],
  templateUrl: './dialog-page.component.html',
  styleUrl: './dialog-page.component.scss',
})
export class DialogPageComponent {
  private _dialogService = inject(DialogService);
  showDialog() {
    this._dialogService
      .confirm({
        title: 'HELLO',
        description: 'Welcome',
      })
      .subscribe((value) => {});
  }

  ngOnInit() {
    this.showDialog();
  }
}
