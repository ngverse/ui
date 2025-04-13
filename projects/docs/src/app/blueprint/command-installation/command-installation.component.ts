import { Component, computed, input } from '@angular/core';
import { SourceCodeComponent } from '../source-code/source-code.component';

@Component({
  selector: 'doc-command-installation',
  imports: [SourceCodeComponent],
  templateUrl: './command-installation.component.html',
  styleUrl: './command-installation.component.css',
})
export class CommandInstallationComponent {
  name = input.required<string>();
  cmd = input<string>('ui');
  installation = computed(
    () => `ng g @ngverse/ui:${this.cmd()} ${this.name()}`
  );
}
