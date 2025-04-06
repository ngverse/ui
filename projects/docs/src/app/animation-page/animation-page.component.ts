import {
  AnimationBuilder,
  AnimationMetadata,
  AnimationPlayer,
} from '@angular/animations';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { CommandInstallationComponent } from '../blueprint/command-installation/command-installation.component';
import { SourceTreeFolder } from '../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../blueprint/source-tree/source-tree.component';
import { ProjectNameComponent } from '../core/project-name/project-name.component';
import { FontIconComponent } from '@/ui/icon/font-icon.component';

@Component({
  selector: 'doc-animation-page',
  imports: [
    FontIconComponent,
    ProjectNameComponent,
    SourceTreeComponent,
    CommandInstallationComponent,
  ],
  templateUrl: './animation-page.component.html',
  styleUrl: './animation-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimationPageComponent {
  animation = input.required<() => AnimationMetadata>();
  private animationBuilder = inject(AnimationBuilder);
  private animationPlaher: AnimationPlayer | undefined;
  playable = viewChild<ElementRef<HTMLElement>>('playable');
  isOpen = signal(false);
  private _document = inject(DOCUMENT);
  title = inject(Title);
  meta = inject(Meta);

  libraryName = signal<string>('');

  platform = inject(Platform);

  fileName = input.required<string>();

  sourceTree = computed<SourceTreeFolder[]>(() => {
    return [
      {
        name: this.name(),
        hideName: true,
        files: [
          {
            name: `${this.fileName()}.animation.ts`,
            path: `${this.fileName()}.animation.ts`,
            language: 'ts',
          },
        ],
      },
    ];
  });

  name = input.required<string>();

  subTitle = input.required<string>();

  constructor() {
    effect(() => {
      const animationFactory = this.animationBuilder.build(this.animation()());
      const playable = this.playable()?.nativeElement;

      this.animationPlaher = animationFactory?.create(playable);
      try {
        this.animationPlaher?.onDone(() => {
          setTimeout(() => {
            this.animationPlaher?.reset();
          }, 200);
        });
        // eslint-disable-next-line no-empty
      } catch {}

      if (this.platform.isBrowser) {
        setTimeout(() => {
          this.play();
        }, 300);

        this._document.defaultView?.scrollTo({
          top: 0,
        });
      }
    });
  }

  toggle() {
    this.isOpen.set(!this.isOpen());
  }

  play() {
    this.animationPlaher?.play();
  }
}
