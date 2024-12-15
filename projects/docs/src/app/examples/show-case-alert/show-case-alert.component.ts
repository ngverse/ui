import { Component } from '@angular/core';
import { AlertDescriptionComponent } from '@ng-verse/alert/alert-description/alert-description.component';
import { AlertHeaderComponent } from '@ng-verse/alert/alert-header/alert-header.component';
import { AlertComponent } from '@ng-verse/alert/alert.component';

@Component({
  selector: 'exp-show-case-alert',
  imports: [AlertComponent, AlertHeaderComponent, AlertDescriptionComponent],
  templateUrl: './show-case-alert.component.html',
  styleUrl: './show-case-alert.component.scss',
})
export class ShowCaseAlertComponent {}
