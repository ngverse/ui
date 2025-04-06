import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CommandInstallationComponent } from '../../blueprint/command-installation/command-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ShowCaseDatepickerComponent } from '../../examples/datepicker/show-case-datepicker/show-case-datepicker.component';
import { ShowCaseTimepickerComponent } from '../../examples/timepicker/show-case-timepicker/show-case-timepicker.component';

@Component({
  selector: 'doc-timepicker-page',
  imports: [
    BlueprintPageComponent,
    ShowCaseComponent,
    ShowCaseDatepickerComponent,
    CommandInstallationComponent,
    ShowCaseTimepickerComponent,
  ],
  templateUrl: './timepicker-page.component.html',
  styleUrl: './timepicker-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimepickerPageComponent {}
