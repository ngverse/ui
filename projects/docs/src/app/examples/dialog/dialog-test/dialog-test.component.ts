import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '../../../../../../ngverse/src/lib/ui/button/button.component';
import { DialogCloseDirective } from '../../../../../../ngverse/src/lib/ui/dialog/dialog-close.directive';
import { FormFieldComponent } from '../../../../../../ngverse/src/lib/ui/form-field/form-field.component';
import { LabelComponent } from '../../../../../../ngverse/src/lib/ui/form-field/label/label.component';
import { InputDirective } from '../../../../../../ngverse/src/lib/ui/input/input.directive';

@Component({
  selector: 'doc-dialog-test',
  imports: [
    FormFieldComponent,
    InputDirective,
    ButtonComponent,
    DialogCloseDirective,
    LabelComponent,
  ],
  templateUrl: './dialog-test.component.html',
  styleUrl: './dialog-test.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTestComponent {}
