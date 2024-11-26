import { Component } from '@angular/core';
import { BlueprintPageComponent } from '../../blueprint/blueprint-page/blueprint-page.component';
import { InstallationComponent } from '../../blueprint/installation/installation.component';
import { SourceCodeComponent } from '../../blueprint/source-code/source-code.component';
import { CInstallationComponent } from '../../blueprint/c-installation/c-installation.component';

@Component({
  selector: 'doc-button-page',
  imports: [
    BlueprintPageComponent,
    CInstallationComponent,
  ],
  templateUrl: './button-page.component.html',
  styleUrl: './button-page.component.scss',
})
export class ButtonPageComponent {}
