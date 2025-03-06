import { CdkMenu } from '@angular/cdk/menu';
import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ContextMenuItemDirective } from './context-menu-item.directive';
import { ContextMenuDirective } from './context-menu.directive';

describe('ContextMenuItemDirective', () => {
  let fixture: ComponentFixture<ContextMenuTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideNoopAnimations(),
      ],
      imports: [ContextMenuTestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ContextMenuTestComponent);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(new ContextMenuItemDirective()).toBeTruthy();
  });
  it('should have CdkMenu attached', () => {
    const contextMenuItem = fixture.debugElement.query(
      By.directive(ContextMenuDirective)
    );
    expect(contextMenuItem.injector.get(CdkMenu)).toBeTruthy();
  });
});

@Component({
  template: ` <div appContextMenu></div> `,
  imports: [ContextMenuDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuTestComponent {}
