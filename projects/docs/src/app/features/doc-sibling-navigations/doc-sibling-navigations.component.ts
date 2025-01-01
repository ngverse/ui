import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, Routes } from '@angular/router';
import { ArrowLeft, ArrowRight, LucideAngularModule } from 'lucide-angular';
import { filter } from 'rxjs';
import { routes } from '../../app.routes';
const DOCS_CHILDREN_ROUTES = routes[1].children as Routes;

@Component({
  selector: 'doc-doc-sibling-navigations',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './doc-sibling-navigations.component.html',
  styleUrl: './doc-sibling-navigations.component.scss',
})
export class DocSiblingNavigationsComponent {
  router = inject(Router);
  prevRoute = signal<string | undefined>(undefined);
  nextRoute = signal<string | undefined>(undefined);
  ArrowLeft = ArrowLeft;
  ArrowRight = ArrowRight;

  constructor() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        const currentPath = this.router.url.split('/')[2];

        const foundRouteIndex = DOCS_CHILDREN_ROUTES.findIndex(
          (r) => r.path === currentPath
        );
        this.prevRoute.set(undefined);
        this.nextRoute.set(undefined);
        if (foundRouteIndex !== -1) {
          if (foundRouteIndex !== 0) {
            this.prevRoute.set(DOCS_CHILDREN_ROUTES[foundRouteIndex - 1].path);
          }
          if (foundRouteIndex !== DOCS_CHILDREN_ROUTES.length - 1) {
            this.nextRoute.set(DOCS_CHILDREN_ROUTES[foundRouteIndex + 1].path);
          }
        }
      });
  }
}
