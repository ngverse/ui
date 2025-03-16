import { ButtonComponent } from '@/ui/button/button.component';
import { FormFieldComponent } from '@/ui/form-field/form-field.component';
import { LabelComponent } from '@/ui/form-field/label.component';
import { OptionComponent } from '@/ui/select/option.component';
import { SelectComponent } from '@/ui/select/select.component';
import {
  TOAST_POSITION,
  TOAST_TYPE,
  ToastService,
} from '@/ui/toast/toast.service';
import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  types = ['success', 'warning', 'danger'];

  type = model<TOAST_TYPE | undefined>(undefined);

  showToast() {
    this.toastService.open({
      position: this.position(),
      type: this.type(),
      message: 'Current time is: ' + new Date().toLocaleTimeString(),
    });
  }
}
