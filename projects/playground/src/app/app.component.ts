import { Component } from '@angular/core';
import { CheckboxComponent } from '@ng-verse/checkbox/checkbox.component';

@Component({
  selector: 'app-root',
  imports: [CheckboxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'playground';
}
