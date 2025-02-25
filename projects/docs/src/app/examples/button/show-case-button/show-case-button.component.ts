import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../../../ngverse/src/lib/ui/button/button.component';
import { IconComponent } from '../../../../../../ngverse/src/lib/ui/icon/icon.component';

@Component({
  selector: 'doc-show-case-button',
  imports: [ButtonComponent, IconComponent],
  templateUrl: './show-case-button.component.html',
  styleUrl: './show-case-button.component.css',
})
export class ShowCaseButtonComponent {}
