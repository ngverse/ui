import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCaseDatepickerComponent } from '../../examples/datepicker/show-case-datepicker/show-case-datepicker.component';

@Component({
  selector: 'doc-datepicker-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseDatepickerComponent,
    CommandInstallationComponent,
  ],
  templateUrl: './datepicker-page.component.html',
  styleUrl: './datepicker-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerPageComponent {}
