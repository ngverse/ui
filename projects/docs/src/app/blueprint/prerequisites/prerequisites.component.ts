import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SourceCodeComponent } from '../source-code/source-code.component';
export interface Prerequisite {
  name: string;
}
@Component({
  selector: 'doc-prerequisites',
  imports: [SourceCodeComponent],
  templateUrl: './prerequisites.component.html',
  styleUrl: './prerequisites.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrerequisitesComponent {
  preps = input.required<Prerequisite[]>();

  getCode(dep: Prerequisite) {
    const name = dep.name;
    return `ng generate ngverse:element ${name}`;
  }
}
