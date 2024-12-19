import { Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCaseDialogComponent } from "../../examples/dialog/show-case-dialog/show-case-dialog.component";

@Component({
  selector: 'doc-dialog-page',
  imports: [BlueprintPageComponent, ShowCaseComponent, ShowCaseDialogComponent],
  templateUrl: './dialog-page.component.html',
  styleUrl: './dialog-page.component.scss',
})
export class DialogPageComponent {
}
