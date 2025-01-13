import { Component, inject, OnInit } from '@angular/core';
import { IconComponent } from '@ng-verse/icon/icon.component';
import { IconRegistryService } from '@ng-verse/icon/icon-registry.service';

@Component({
  selector: 'doc-show-case-icon',
  imports: [IconComponent],
  templateUrl: './show-case-icon.component.html',
  styleUrl: './show-case-icon.component.scss',
})
export class ShowCaseIconComponent implements OnInit {
  iconRegistryService = inject(IconRegistryService);

  ngOnInit() {
    this.iconRegistryService.addSvgIcon('home', '/icon-samples/home.svg');
    this.iconRegistryService.addSvgIcon(
      'checkmark',
      '/icon-samples/checkmark.svg'
    );
  }
}
