import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { DialogCloseDirective } from '@ng-verse/dialog/dialog-close.directive';
import { FormFieldComponent } from '@ng-verse/form-field/form-field.component';
import { LabelComponent } from '@ng-verse/form-field/label/label.component';
import { InputDirective } from '@ng-verse/input/input.directive';

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
  styleUrl: './dialog-test.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTestComponent {}
