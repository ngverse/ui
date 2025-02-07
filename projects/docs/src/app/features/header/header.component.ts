import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '@ng-verse/button/button.component';
import { DarkModeToggleComponent } from '@ng-verse/dark-mode/dark-mode-toggle/dark-mode-toggle.component';
import { IconComponent } from '@ng-verse/icon/icon.component';
import { LucideAngularModule, Menu } from 'lucide-angular';
import { filter, take, takeUntil } from 'rxjs';
import { ProjectNameComponent } from '../../core/project-name/project-name.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'doc-header',
  imports: [
    RouterLink,
    ProjectNameComponent,
    LucideAngularModule,
    ButtonComponent,
    IconComponent,
    DarkModeToggleComponent,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  Menu = Menu;
  overlay = inject(Overlay);
  overlayRef: OverlayRef | undefined;
  router = inject(Router);

  showSidebar() {
    this.overlayRef = this.overlay.create({
      positionStrategy: this.overlay.position().global().left(),
      // height: '100%',
      // width: '90vw',
      hasBackdrop: true,
      disposeOnNavigation: true,
    });
    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef?.dispose();
    });
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .pipe(take(1))
      .pipe(takeUntil(this.overlayRef.backdropClick().pipe(take(1))))
      .subscribe(() => {
        this.overlayRef?.dispose();
      });
    this.overlayRef.attach(new ComponentPortal(SidebarComponent));
  }
}
