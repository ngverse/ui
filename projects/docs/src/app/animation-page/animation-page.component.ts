import { CardComponent } from '@/ui/card/card.component';
import { FontIconComponent } from '@/ui/icon/font-icon.component';
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
import { capitalCase, kebabCase } from 'change-case';
import { CommandInstallationComponent } from '../blueprint/command-installation/command-installation.component';
import { SourceTreeFolder } from '../blueprint/source-tree/source-tree-builder';
import { SourceTreeComponent } from '../blueprint/source-tree/source-tree.component';
import { ProjectNameComponent } from '../core/project-name/project-name.component';
import { FontIconComponent } from '@/ui/icon/font-icon.component';

type TRIGGER_TYPES = 'all' | 'enter' | 'leave' | 'none';

interface TriggerType {
  name: string;
  type: ':enter' | ':leave' | ':increment' | ':decrement';
  description: string;
}

interface AnimationOption {
  name: string;
  type: string;
  default: string;
  description: string;
}

@Component({
  selector: 'doc-animation-page',
  imports: [
    FontIconComponent,
    ProjectNameComponent,
    SourceTreeComponent,
    CommandInstallationComponent,
    CardComponent,
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

  label = computed(() => capitalCase(this.name()));

  defaultOptions: AnimationOption = {
    name: 'duration',
    type: 'number',
    default: '250ms',
    description: 'duration of the animation',
  };

  options = input<AnimationOption[]>();

  platform = inject(Platform);

  fileName = computed(() => kebabCase(this.name()));

  trigger = input.required<TRIGGER_TYPES>();

  name = input.required<string>();

  triggers = computed(() => {
    const triggers: TriggerType[] = [];
    const trigger = this.trigger();

    if (trigger === 'all' || trigger === 'enter') {
      triggers.push({
        name: `${this.name()}OnEnter`,
        type: ':enter',
        description: 'triggers when element enters the view',
      });
      triggers.push({
        name: `${this.name()}OnIncr`,
        type: ':increment',
        description: 'triggers when numeric value increases',
      });
    }
    if (trigger === 'all' || trigger === 'leave') {
      triggers.push({
        name: `${this.name()}OnLeave`,
        type: ':leave',
        description: 'triggers when element leaves the view',
      });
      triggers.push({
        name: `${this.name()}OnDecr`,
        type: ':decrement',
        description: 'triggers when numeric value decreases',
      });
    }
    return triggers;
  });

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
