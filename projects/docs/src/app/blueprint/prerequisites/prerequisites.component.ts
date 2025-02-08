import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SourceCodeComponent } from '../source-code/source-code.component';
export interface Prerequisite {
  name: string;
  label?: string;
}
@Component({
  selector: 'doc-prerequisites',
  imports: [SourceCodeComponent, RouterLink],
  templateUrl: './prerequisites.component.html',
  styleUrl: './prerequisites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrerequisitesComponent {
  preps = input.required<Prerequisite[]>();
  name = input<string>();

  preprsAuto = input<Prerequisite[]>();

  getCode(dep: Prerequisite) {
    const name = dep.name;
    return `ng g ng-verse:element ${name}`;
  }
}
