import { Component, inject, OnInit } from '@angular/core';
import { SvgIconComponent } from '@ng-verse/svg-icon/svg-icon.component';
import { SvgIconRegistryService } from '@ng-verse/svg-icon/svg-icon-registry.service';

@Component({
  selector: 'doc-show-case-svg-icon',
  imports: [SvgIconComponent],
  templateUrl: './show-case-svg-icon.component.html',
  styleUrl: './show-case-svg-icon.component.scss',
})
export class ShowCaseSvgIconComponent implements OnInit {
  svgIconRegistryService = inject(SvgIconRegistryService);

  ngOnInit() {
    this.svgIconRegistryService.addSvgIcon('logo', '/images/folder.svg');
  }
}
