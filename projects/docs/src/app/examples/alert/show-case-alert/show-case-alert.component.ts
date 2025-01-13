import { Component } from '@angular/core';
import { AlertBodyComponent } from '@ng-verse/alert/alert-body/alert-body.component';
import { AlertHeaderComponent } from '@ng-verse/alert/alert-header/alert-header.component';
import { AlertComponent } from '@ng-verse/alert/alert.component';

@Component({
  selector: 'doc-show-case-alert',
  imports: [AlertComponent, AlertHeaderComponent, AlertBodyComponent],
  templateUrl: './show-case-alert.component.html',
  styleUrl: './show-case-alert.component.scss',
})
export class ShowCaseAlertComponent {}
