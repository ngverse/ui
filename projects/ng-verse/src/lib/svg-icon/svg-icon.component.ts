import { Component, input, ViewEncapsulation } from '@angular/core';
import { LoadSvgPipe } from '@ng-verse/svg-icon/load-svg.pipe';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-svg-icon',
  imports: [
    LoadSvgPipe,
    AsyncPipe
  ],
  templateUrl: './svg-icon.component.html',
  styleUrl: './svg-icon.component.scss'
})
export class SvgIconComponent {
  svgIcon = input.required<string>();
}
