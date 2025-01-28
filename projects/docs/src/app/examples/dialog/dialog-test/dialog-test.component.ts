import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@ngverse/button/button.component';
import { DialogCloseDirective } from '@ngverse/dialog/dialog-close.directive';
import { FormFieldComponent } from '@ngverse/form-field/form-field.component';
import { LabelComponent } from '@ngverse/form-field/label/label.component';
import { InputComponent } from '@ngverse/input/input.component';

@Component({
  selector: 'doc-dialog-test',
  imports: [
    FormFieldComponent,
    InputComponent,
    ButtonComponent,
    DialogCloseDirective,
    LabelComponent,
  ],
  templateUrl: './dialog-test.component.html',
  styleUrl: './dialog-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTestComponent {}
