import { Component, computed, input } from '@angular/core';
import { SourceCodeComponent } from '../source-code/source-code.component';

@Component({
  selector: 'doc-command-installation',
  imports: [SourceCodeComponent],
  templateUrl: './command-installation.component.html',
  styleUrl: './command-installation.component.scss',
})
export class CommandInstallationComponent {
  type = input('component');
  name = input.required<string>();
  installation = computed(
    () => `ng generate ng-verse:${this.type()} ${this.name()}`
  );
}
