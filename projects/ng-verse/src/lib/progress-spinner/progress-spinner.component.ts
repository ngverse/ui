import { Component, input } from '@angular/core';

@Component({
  selector: 'app-progress-spinner',
  imports: [],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.scss',
})
export class ProgressSpinnerComponent {
  radius = input(50);
}
