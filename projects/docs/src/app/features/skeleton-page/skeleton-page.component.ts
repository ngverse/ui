import { Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SkeletonComponent } from '../../../../../ng-verse/src/lib/skeleton/skeleton.component';

@Component({
  selector: 'doc-skeleton-page',
  imports: [BlueprintPageComponent, ShowCaseComponent, SkeletonComponent],
  templateUrl: './skeleton-page.component.html',
  styleUrl: './skeleton-page.component.scss',
})
export class SkeletonPageComponent {}
