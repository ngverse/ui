import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SwitchComponent } from '@ng-verse/switch/switch.component';

@Component({
  selector: 'doc-show-case-switch',
  imports: [SwitchComponent, FormsModule],
  templateUrl: './show-case-switch.component.html',
  styleUrl: './show-case-switch.component.scss',
})
export class ShowCaseSwitchComponent {
  value = model(false);
}
