import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BadgeDirective } from './badge.directive';

describe('BadgeDirective', () => {
  let fixture: ComponentFixture<BadgeTestComponent>;
  let debugElement: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BadgeTestComponent],
    });
    fixture = TestBed.createComponent(BadgeTestComponent);
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const component = TestBed.createComponent(BadgeTestComponent);
    expect(component).toBeTruthy();
  });
  it('should display count', () => {
    const badgeElement = debugElement.query(By.directive(BadgeDirective))
      .children[0];
    expect(badgeElement.nativeElement.textContent).toBe('5');
  });
  it('should update count', () => {
    const badgeElement = debugElement.query(By.directive(BadgeDirective))
      .children[0];
    fixture.componentInstance.count.update((c) => c + 1);
    fixture.detectChanges();
    expect(badgeElement.nativeElement.textContent).toBe('6');
  });
  it('should hide badge', () => {
    const badgeElement = debugElement.query(By.directive(BadgeDirective))
      .children[0];
    fixture.componentInstance.hideBadge.set(true);
    fixture.detectChanges();
    expect(badgeElement.nativeElement.style.display).toBe('none');
  });
});

@Component({
  imports: [BadgeDirective],
  template: `
    <span [hideBadge]="hideBadge()" [appBadge]="count()"> Notifications </span>
  `,
})
class BadgeTestComponent {
  count = signal(5);
  hideBadge = signal(false);
}
