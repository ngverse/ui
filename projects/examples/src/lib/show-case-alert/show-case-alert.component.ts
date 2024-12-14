import { Component } from '@angular/core';
import { AlertComponent } from "../../../../ng-verse/src/lib/alert/alert.component";
import { AlertHeaderComponent } from "../../../../ng-verse/src/lib/alert/alert-header/alert-header.component";
import { AlertDescriptionComponent } from "../../../../ng-verse/src/lib/alert/alert-description/alert-description.component";

@Component({
  selector: 'exp-show-case-alert',
  imports: [AlertComponent, AlertHeaderComponent, AlertDescriptionComponent],
  templateUrl: './show-case-alert.component.html',
  styleUrl: './show-case-alert.component.scss'
})
export class ShowCaseAlertComponent {

}
