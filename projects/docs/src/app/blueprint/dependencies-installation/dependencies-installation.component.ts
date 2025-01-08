import { Component, input } from '@angular/core';
import { SourceCodeComponent } from '../source-code/source-code.component';

interface Dependency {
  name: string;
  type?: string;
}

@Component({
  selector: 'doc-dependencies-installation',
  imports: [SourceCodeComponent],
  templateUrl: './dependencies-installation.component.html',
  styleUrl: './dependencies-installation.component.scss',
})
export class DependenciesInstallationComponent {
  deps = input.required<Dependency[]>();

  getCode(dep: Dependency) {
    const type = dep.type ?? 'component';
    const name = dep.name;
    return `ng generate ng-verse:${type} ${name}`;
  }
}
