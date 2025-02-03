import { Component } from '@angular/core';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { IconButtonComponent } from '@ng-verse/button/icon-button.component';
import { IconComponent } from '@ng-verse/icon/icon.component';

@Component({
  selector: 'doc-show-case-button',
  imports: [ButtonComponent, IconButtonComponent, IconComponent],
  templateUrl: './show-case-button.component.html',
  styleUrl: './show-case-button.component.scss',
})
export class ShowCaseButtonComponent {}
