import {
  ApplicationRef, ComponentRef,
  createComponent,
  Directive, effect,
  ElementRef,
  inject,
  input, OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { BadgeBodyComponent } from '@ng-verse/badge/badge-body.component';

@Directive({
  selector: '[appBadge]',
  host: {
    '[style.position]': '"relative"'
  }
})
export class BadgeDirective implements OnInit, OnDestroy {
  showOnPositive = input(true, {transform: coerceBooleanProperty});
  value = input.required<number>({alias: 'appBadge'});

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  private readonly appRef = inject(ApplicationRef);

  private componentRef: ComponentRef<BadgeBodyComponent> | null = null;

  constructor() {
    effect(() => {
      const value = this.value();
      const shouldDisplay = value && this.showOnPositive() && value > 0;

      if (this.componentRef) {
        if (shouldDisplay) {
          this.componentRef.setInput('value', value);
          this.componentRef.changeDetectorRef.detectChanges();
        } else {
          this.deleteComponent();
        }
      } else if(shouldDisplay) {
        this.createComponent();
      }
    });
  }

  ngOnInit() {
    this.createComponent();
  }

  ngOnDestroy() {
    this.deleteComponent();
  }

  private deleteComponent() {
    if (this.componentRef) {
      this.renderer.removeChild(
        this.el.nativeElement,
        this.componentRef.location.nativeElement
      );
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  private createComponent() {
    if (this.componentRef) {
      return;
    }

    this.componentRef = createComponent(BadgeBodyComponent, {
      environmentInjector: this.appRef.injector,
    });

    this.componentRef.setInput('value', this.value());

    this.renderer.appendChild(
      this.el.nativeElement,
      this.componentRef.location.nativeElement
    );
    this.componentRef.changeDetectorRef.detectChanges();
  }

}
