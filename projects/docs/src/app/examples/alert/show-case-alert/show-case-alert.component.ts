import { Component } from '@angular/core';
import { AlertBodyComponent } from 'ngverse/alert/alert-body.component';
import { AlertHeaderComponent } from 'ngverse/alert/alert-header.component';
import { AlertComponent } from 'ngverse/alert/alert.component';

@Component({
  selector: 'doc-show-case-alert',
  imports: [AlertComponent, AlertHeaderComponent, AlertBodyComponent],
  templateUrl: './show-case-alert.component.html',
  styleUrl: './show-case-alert.component.scss',
})
export class ShowCaseAlertComponent {}
