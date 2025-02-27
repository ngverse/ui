import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let fixture: ComponentFixture<CardTestComponent>;
  let cardFixture: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(CardTestComponent);
    cardFixture = fixture.debugElement.query(By.directive(CardComponent));
    await fixture.whenStable();
  });

  it('should add outline class', async () => {
    fixture.componentInstance.outline.set(true);
    await fixture.whenStable();
    expect(cardFixture.nativeElement.classList).toContain('outline');
  });
  it('should add shadow class', async () => {
    fixture.componentInstance.shadow.set(true);
    await fixture.whenStable();
    expect(cardFixture.nativeElement.classList).toContain('shadow');
  });
  it('should add gap class', async () => {
    fixture.componentInstance.gap.set(true);
    await fixture.whenStable();
    expect(cardFixture.nativeElement.classList).toContain('gap');
  });
  it('should add surface class', async () => {
    fixture.componentInstance.surface.set(true);
    await fixture.whenStable();

    expect(cardFixture.nativeElement.classList).toContain('surface');
  });
});
@Component({
  template: `
    <app-card
      [outline]="outline()"
      [surface]="surface()"
      [shadow]="shadow()"
      [gap]="gap()"
    >
    </app-card>
  `,
  imports: [CardComponent],
  selector: 'app-card-test',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CardTestComponent {
  outline = signal(false);
  shadow = signal(false);
  gap = signal(false);
  surface = signal(false);
}
