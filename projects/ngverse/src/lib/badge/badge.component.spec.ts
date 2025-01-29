import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BadgeComponent } from './badge.component';

describe('BadgeComponent', () => {
  let fixture: ComponentFixture<BadgeTestComponent>;
  let debugElement: DebugElement;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [BadgeTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(BadgeTestComponent);
    await fixture.whenStable();
    debugElement = fixture.debugElement;
  });

  it('should create an instance', () => {
    const component = TestBed.createComponent(BadgeTestComponent);
    expect(component).toBeTruthy();
  });
  it('should display count', () => {
    const badgeElement = debugElement.query(By.directive(BadgeComponent))
      .children[0];
    expect(badgeElement.nativeElement.textContent.trim()).toBe('5');
  });
  it('should update count', async () => {
    const badgeElement = debugElement.query(By.directive(BadgeComponent))
      .children[0];
    fixture.componentInstance.count.update((c) => c + 1);
    await fixture.whenStable();
    expect(badgeElement.nativeElement.textContent.trim()).toBe('6');
  });
  it('should hide badge', () => {
    const badgeElement = debugElement.query(By.directive(BadgeComponent))
      .children[0];
    fixture.componentInstance.hideBadge.set(true);
    expect(badgeElement.nativeElement.style.display).toBe('');
  });
});

@Component({
  imports: [BadgeComponent],
  template: `
    <span
      >Notifications <app-badge [value]="count()" [hide]="!count()"></app-badge>
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class BadgeTestComponent {
  count = signal(5);
  hideBadge = signal(false);
}
