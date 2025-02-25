import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../../../ngverse/src/lib/button/button.component';
import { IconComponent } from '../../../../../../ngverse/src/lib/icon/icon.component';

@Component({
  selector: 'doc-show-case-button',
  imports: [ButtonComponent, IconComponent],
  templateUrl: './show-case-button.component.html',
  styleUrl: './show-case-button.component.scss',
})
export class ShowCaseButtonComponent {}
