import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../../ng-verse/src/public-api';

@Component({
  selector: 'exp-simple-button',
  imports: [ButtonComponent],
  templateUrl: './simple-button.component.html',
  styleUrl: './simple-button.component.scss',
})
export class SimpleButtonComponent {}
