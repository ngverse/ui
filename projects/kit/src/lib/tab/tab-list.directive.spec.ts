import {
  ChangeDetectionStrategy,
  Component,
  input,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { A11yTabListDirective } from './tab-list.directive';
import { A11yTabStack } from './tab-stack';

describe('TablistDirective', () => {
  let fixture: ComponentFixture<GnTabListTestComponent>;
  let tabListel: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection(), A11yTabStack],
      imports: [GnTabListTestComponent],
    });
    fixture = TestBed.createComponent(GnTabListTestComponent);
    tabListel = fixture.debugElement.query(By.css('div')).nativeElement;
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
  it("should have role='tablist'", () => {
    expect(tabListel.getAttribute('role')).toBe('tablist');
  });
});

@Component({
  template: ` <div ktA11yTabList>I am tab list</div> `,
  imports: [A11yTabListDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnTabListTestComponent {
  orientation = input<string>();
}
