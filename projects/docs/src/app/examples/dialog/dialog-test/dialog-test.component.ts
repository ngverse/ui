import { ButtonComponent } from '@/ui/button/button.component';
import { DialogCloseDirective } from '@/ui/dialog/dialog-close.directive';
import { FormFieldComponent } from '@/ui/form-field/form-field.component';
import { LabelComponent } from '@/ui/form-field/label.component';
import { InputDirective } from '@/ui/input/input.directive';
import { ChangeDetectionStrategy, Component } from '@angular/core';

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
