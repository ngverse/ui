import { ButtonComponent } from '@/ui/button/button.component';
import { Component } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { matArrowForward } from '@ng-icons/material-icons/baseline';

@Component({
  selector: 'doc-show-case-button',
  imports: [ButtonComponent, NgIcon],
  templateUrl: './show-case-button.component.html',
  styleUrl: './show-case-button.component.css',
})
export class ShowCaseButtonComponent {
  ARROW_RIGHT = matArrowForward;
}
