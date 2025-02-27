import { ButtonComponent } from '@/ui/button/button.component';
import { IconComponent } from '@/ui/icon/icon.component';
import { Component } from '@angular/core';

@Component({
  selector: 'doc-show-case-button',
  imports: [ButtonComponent, IconComponent],
  templateUrl: './show-case-button.component.html',
  styleUrl: './show-case-button.component.css',
})
export class ShowCaseButtonComponent {}
