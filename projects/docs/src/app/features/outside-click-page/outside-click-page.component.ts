import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../../ng-verse/src/public-api';
import { ApiInfoComponent } from '../../blueprint/api-info/api-info.component';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { CInstallationComponent } from '../../blueprint/c-installation/c-installation.component';
import { ShowCaseComponent } from '../../blueprint/show-case/show-case.component';
import { SourceTreeComponent } from "../../blueprint/source-tree/source-tree.component";

@Component({
  selector: 'doc-outside-click-page',
  imports: [
    BlueprintPageComponent,
    CInstallationComponent,
    ShowCaseComponent,
    ButtonComponent,
    ShowCaseComponent,
    ApiInfoComponent,
    SourceTreeComponent
],
  templateUrl: './outside-click-page.component.html',
  styleUrl: './outside-click-page.component.scss',
})
export class OutsideClickPageComponent {}
