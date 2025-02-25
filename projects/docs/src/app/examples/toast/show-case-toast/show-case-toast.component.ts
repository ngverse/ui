import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../../../ngverse/src/lib/ui/button/button.component';
import { FormFieldComponent } from '../../../../../../ngverse/src/lib/ui/form-field/form-field.component';
import { LabelComponent } from '../../../../../../ngverse/src/lib/ui/form-field/label/label.component';
import { OptionComponent } from '../../../../../../ngverse/src/lib/ui/select/option.component';
import { SelectComponent } from '../../../../../../ngverse/src/lib/ui/select/select.component';
import {
  TOAST_POSITION,
  TOAST_TYPE,
  ToastService,
} from '../../../../../../ngverse/src/lib/ui/toast/toast.service';

@Component({
  selector: 'doc-show-case-toast',
  imports: [
    ButtonComponent,
    SelectComponent,
    OptionComponent,
    FormsModule,
    FormFieldComponent,
    LabelComponent,
  ],
  templateUrl: './show-case-toast.component.html',
  styleUrl: './show-case-toast.component.css',
})
export class ShowCaseToastComponent {
  toastService = inject(ToastService);

  position = model<TOAST_POSITION>('bottom_center');

  positions: { value: TOAST_POSITION; name: string }[] = [
    { value: 'top_left', name: 'Top Left' },
    { value: 'top_center', name: 'Top Center' },
    { value: 'top_right', name: 'Top Right' },
    { value: 'right_center', name: 'Right Center' },
    { value: 'bottom_left', name: 'Bottom Left' },
    { value: 'bottom_center', name: 'Bottom Center' },
    { value: 'left_center', name: 'Left Center' },
    { value: 'right_bottom', name: 'Right Bottom' },
  ];

  types = ['default', 'success', 'warning', 'danger'];

  type = model<TOAST_TYPE>('default');

  showToast() {
    this.toastService.open({
      position: this.position(),
      type: this.type(),
      message: 'Current time is: ' + new Date().toLocaleTimeString(),
      closeDelay: 1000,
    });
  }
}
