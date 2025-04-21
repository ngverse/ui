import { ButtonComponent } from '@/ui/button/button.component';
import { FontIconComponent } from '@/ui/font-icon/font-icon.component';
import { Component } from '@angular/core';

@Component({
  selector: 'doc-show-case-button',
  imports: [ButtonComponent, FontIconComponent],
  templateUrl: './show-case-button.component.html',
  styleUrl: './show-case-button.component.css',
})
export class ShowCaseButtonComponent {}
