import { Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCaseProgressBarComponent } from "../../../../../examples/src/lib/progress-bar/show-case-progress-bar/show-case-progress-bar.component";

@Component({
  selector: 'doc-progress-bar-page',
  imports: [BlueprintPageComponent, ShowCaseComponent, ShowCaseProgressBarComponent],
  templateUrl: './progress-bar-page.component.html',
  styleUrl: './progress-bar-page.component.scss',
})
export class ProgressBarPageComponent {}
