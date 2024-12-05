import { Component, inject } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { DialogService } from '../../../../../ng-verse/src/lib/dialog/dialog.service';

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
        hasBackdrop: false,
      })
      .subscribe((value) => {
        console.log('VALUE ', value);
      });
  }

  ngOnInit() {
    this.showDialog();
  }
}
