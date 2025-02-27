import { SwitchComponent } from '@/ui/switch/switch.component';
import { Component } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'doc-show-case-switch',
  imports: [SwitchComponent, ReactiveFormsModule, FormsModule],
  templateUrl: './show-case-switch.component.html',
  styleUrl: './show-case-switch.component.css',
})
export class ShowCaseSwitchComponent {
  formControl = new FormControl(null, Validators.requiredTrue);
}
