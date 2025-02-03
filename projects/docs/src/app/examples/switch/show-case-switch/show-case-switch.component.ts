import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SwitchComponent } from '@ng-verse/switch/switch.component';

@Component({
  selector: 'doc-show-case-switch',
  imports: [SwitchComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './show-case-switch.component.html',
  styleUrl: './show-case-switch.component.scss',
})
export class ShowCaseSwitchComponent {
  formControl = new FormControl(null, Validators.requiredTrue);
}
