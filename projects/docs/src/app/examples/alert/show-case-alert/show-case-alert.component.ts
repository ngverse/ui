import { Component } from '@angular/core';
import { AlertBodyComponent } from '../../../../../../ngverse/src/lib/ui/alert/alert-body.component';
import { AlertHeaderComponent } from '../../../../../../ngverse/src/lib/ui/alert/alert-header.component';
import { AlertComponent } from '../../../../../../ngverse/src/lib/ui/alert/alert.component';

@Component({
  selector: 'doc-show-case-alert',
  imports: [AlertComponent, AlertHeaderComponent, AlertBodyComponent],
  templateUrl: './show-case-alert.component.html',
  styleUrl: './show-case-alert.component.css',
})
export class ShowCaseAlertComponent {}
