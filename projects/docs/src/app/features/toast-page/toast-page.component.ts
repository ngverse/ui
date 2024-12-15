import { Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCaseToastComponent } from '../../examples/toast/show-case-toast/show-case-toast.component';

@Component({
  selector: 'doc-toast-page',
  imports: [BlueprintPageComponent, ShowCaseComponent, ShowCaseToastComponent],
  templateUrl: './toast-page.component.html',
  styleUrl: './toast-page.component.scss',
})
export class ToastPageComponent {}
