import { Component, effect, model } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SwitchComponent } from '../../../../../ng-verse/src/lib/switch/switch.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'doc-switch-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    SwitchComponent,
    FormsModule,
  ],
  templateUrl: './switch-page.component.html',
  styleUrl: './switch-page.component.scss',
})
export class SwitchPageComponent {
  value = model();
}
