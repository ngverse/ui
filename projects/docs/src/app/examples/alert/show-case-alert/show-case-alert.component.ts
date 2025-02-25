import { Component } from '@angular/core';
import { AlertBodyComponent } from '../../../@/ui/alert/alert-body.component';
import { AlertHeaderComponent } from '../../../@/ui/alert/alert-header.component';
import { AlertComponent } from '../../../@/ui/alert/alert.component';

@Component({
  selector: 'doc-show-case-alert',
  imports: [AlertComponent, AlertHeaderComponent, AlertBodyComponent],
  templateUrl: './show-case-alert.component.html',
  styleUrl: './show-case-alert.component.css',
})
export class ShowCaseAlertComponent {}
