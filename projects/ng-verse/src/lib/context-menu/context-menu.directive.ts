import {
  animate,
  AnimationBuilder,
  AnimationPlayer,
  style,
} from '@angular/animations';
import { CdkMenu } from '@angular/cdk/menu';
import { Directive, ElementRef, inject, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appContextMenu]',
  hostDirectives: [CdkMenu],
  host: {
    '[class.app-context-menu]': 'true',
  },
})
export class ContextMenuDirective implements OnDestroy {
  animationBuilder = inject(AnimationBuilder);
  player!: AnimationPlayer;
  host = inject(ElementRef);

  menu = inject(CdkMenu);

  animation = this.animationBuilder.build([
    style({ transform: 'scale(0)', opacity: 0 }),
    animate('150ms', style({ opacity: 1, transform: 'scale(1)' })),
  ]);

  constructor() {
    this.enter();
  }

  enter() {
    this.player = this.animation.create(this.host.nativeElement);
    this.player.play();
  }

  ngOnDestroy(): void {
    this.player.destroy();
  }
}
