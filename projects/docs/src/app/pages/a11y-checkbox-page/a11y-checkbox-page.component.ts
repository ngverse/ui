import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { ApiSectionComponent } from '../../core/kit-page/api-section/api-section.component';
import { KitPageComponent } from '../../core/kit-page/kit-page.component';
import { ApiSection } from '../../core/kit-page/kit-page.types';
import { OverviewSectionHeaderComponent } from '../../core/kit-page/overview-section/overview-section-header/overview-section-header.component';
import { OverviewSectionComponent } from '../../core/kit-page/overview-section/overview-section.component';
import { ShowCaseA11yCheckboxComponent } from '../../examples/a11y-checkbox/show-case-a11y-checkbox/show-case-a11y-checkbox.component';

@Component({
  selector: 'doc-a11y-checkbox-page',
  imports: [
    KitPageComponent,
    OverviewSectionComponent,
    OverviewSectionHeaderComponent,
    ShowCaseComponent,
    ApiSectionComponent,
    ShowCaseA11yCheckboxComponent,
  ],
  templateUrl: './a11y-checkbox-page.component.html',
  styleUrl: './a11y-checkbox-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class A11yCheckboxPageComponent {
  api: ApiSection = {};
}
