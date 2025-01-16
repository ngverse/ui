import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
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
    }).compileComponents();

    fixture = TestBed.createComponent(CardTestComponent);
    cardFixture = fixture.debugElement.query(By.directive(CardComponent));
  });

  it('should add outline class', () => {
    fixture.componentInstance.outline.set(true);
    fixture.detectChanges();
    expect(cardFixture.nativeElement.classList).toContain('outline');
  });
  it('should add shadow class', () => {
    fixture.componentInstance.shadow.set(true);
    fixture.detectChanges();
    expect(cardFixture.nativeElement.classList).toContain('shadow');
  });
  it('should add gap class', () => {
    fixture.componentInstance.gap.set(true);
    fixture.detectChanges();
    expect(cardFixture.nativeElement.classList).toContain('gap');
  });
  it('should add surface class', () => {
    fixture.componentInstance.surface.set(true);
    fixture.detectChanges();
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
