import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class AlertComponent {
  type = input<'default' | 'success' | 'danger' | 'warning'>('default');
}
