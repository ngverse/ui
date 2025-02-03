import { Component } from '@angular/core';
import { ButtonComponent } from '@ngverse/button/button.component';
import { IconButtonComponent } from '@ngverse/button/icon-button.component';
import { IconComponent } from '@ngverse/icon/icon.component';

@Component({
  selector: 'doc-show-case-button',
  imports: [ButtonComponent, IconButtonComponent, IconComponent],
  templateUrl: './show-case-button.component.html',
  styleUrl: './show-case-button.component.scss',
})
export class ShowCaseButtonComponent {}
