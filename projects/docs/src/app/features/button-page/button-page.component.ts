import { Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CInstallationComponent } from '../../blueprint/c-installation/c-installation.component';
import { ButtonComponent } from '../../../../../ng-verse/src/public-api';
import { ShowCaseComponent } from "../../blueprint/show-case/show-case.component";
import { ApiInfoComponent } from "../../blueprint/api-info/api-info.component";

@Component({
  selector: 'doc-button-page',
  imports: [
    BlueprintPageComponent,
    CInstallationComponent,
    ShowCaseComponent,
    ButtonComponent,
    ShowCaseComponent,
    ApiInfoComponent
],
  templateUrl: './button-page.component.html',
  styleUrl: './button-page.component.scss',
})
export class ButtonPageComponent {}
