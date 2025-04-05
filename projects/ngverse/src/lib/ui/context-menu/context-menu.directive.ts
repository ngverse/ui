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
    class: 'shadow-md bg-background rounded-md border border-border',
  },
})
export class ContextMenuDirective implements OnDestroy {
  private animationBuilder = inject(AnimationBuilder);
  private player!: AnimationPlayer;
  private host = inject(ElementRef);

  private animation = this.animationBuilder.build([
    style({ transform: 'scale(0)', opacity: 0 }),
    animate('150ms', style({ opacity: 1, transform: 'scale(1)' })),
  ]);

  constructor() {
    this.enter();
  }

  private enter() {
    this.player = this.animation.create(this.host.nativeElement);
    this.player.play();
  }

  ngOnDestroy(): void {
    this.player.destroy();
  }
}
