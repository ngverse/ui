import {
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';

const STYLES = `display: inline;
border-radius: 100%;
min-width: 16px;
min-height: 16px;
font-size: 12px;
font-weight: 500;
position: absolute;
bottom: 100%;
left: 100%;
text-align: center;
background-color: var(--danger);
color: #fff;
margin: -12px 0;
padding: 0 4px;`;

@Directive({
  selector: '[appBadge]',
  host: {
    '[style.position]': '"relative"',
  },
})
export class BadgeDirective implements OnInit, OnDestroy {
  value = input.required<string | number | undefined | null>({
    alias: 'appBadge',
  });
  hideBadge = input<boolean>(false);

  private readonly el = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  badgeElement: HTMLElement | undefined;

  constructor() {
    effect(() => {
      const value = this.value();
      if (this.badgeElement) {
        this.badgeElement.textContent = value?.toString() || '';
      }
    });
    effect(() => {
      if (this.hideBadge()) {
        this.hide();
      } else {
        this.show();
      }
    });
  }

  show() {
    if (this.badgeElement) {
      this.renderer.setStyle(this.badgeElement, 'display', 'inline');
    }
  }

  hide() {
    if (this.badgeElement) {
      this.renderer.setStyle(this.badgeElement, 'display', 'none');
    }
  }

  ngOnInit() {
    this.create();
  }

  ngOnDestroy() {
    this.delete();
  }

  create() {
    const element = this.renderer.createElement('span');
    this.renderer.setAttribute(element, 'style', STYLES);
    this.renderer.appendChild(this.el.nativeElement, element);
    this.renderer.setProperty(element, 'textContent', this.value()?.toString());
    this.badgeElement = element;
  }

  private delete() {
    if (this.badgeElement) {
      this.renderer.removeChild(this.el.nativeElement, this.badgeElement);
    }
  }
}
