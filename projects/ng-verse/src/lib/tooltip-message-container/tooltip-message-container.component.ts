import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-tooltip-message-container',
  imports: [NgClass],
  templateUrl: './tooltip-message-container.component.html',
  styleUrl: './tooltip-message-container.component.scss',
})
export class TooltipMessageContainerComponent {
  message = signal<string>('');

  position = signal<string>('top');
}
