import { afterNextRender, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastService } from '@ng-verse/toast/toast.service';
import { DocSiblingNavigationsComponent } from '../doc-sibling-navigations/doc-sibling-navigations.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
const EARLY_RELEASE_KEY = 'early-release';

@Component({
  selector: 'doc-doc-container-page',
  imports: [SidebarComponent, RouterOutlet, DocSiblingNavigationsComponent],
  templateUrl: './doc-container-page.component.html',
  styleUrl: './doc-container-page.component.scss',
})
export class DocContainerPageComponent {
  toast = inject(ToastService);
  constructor() {
    afterNextRender(() => {
      setTimeout(() => {
        const hasValue = localStorage.getItem(EARLY_RELEASE_KEY);
        if (!hasValue) {
          this.toast.open({
            position: 'top_center',
            message: 'We are in early release. expect updates !',
            closeDelay: 3000,
            showCloseIcon: false,
          });
        }
        localStorage.setItem(EARLY_RELEASE_KEY, 'true');
      }, 1000);
    });
  }
}
