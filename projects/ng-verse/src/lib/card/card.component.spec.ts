import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  signal,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { CardContentComponent } from './card-content.component';
import { CardFooterComponent } from './card-footer.component';
import { CardTitleComponent } from './card-title.component';
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
  it('should display all passed components', () => {
    expect(fixture.nativeElement.querySelector('app-card-title')).toBeTruthy();
    expect(
      fixture.nativeElement.querySelector('app-card-content')
    ).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-card-footer')).toBeTruthy();
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
      <app-card-title>Title</app-card-title>
      <app-card-content>Body</app-card-content>
      <app-card-footer>Footer</app-card-footer>
    </app-card>
  `,
  imports: [
    CardComponent,
    CardContentComponent,
    CardFooterComponent,
    CardTitleComponent,
  ],
  selector: 'app-card-test',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class CardTestComponent {
  outline = signal(false);
  shadow = signal(false);
  gap = signal(false);
  surface = signal(false);
}
