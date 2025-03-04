import { CdkMenuItem } from '@angular/cdk/menu';
import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ContextMenuItemDirective } from './context-menu-item.directive';
import { ContextMenuDirective } from './context-menu.directive';

describe('ContextMenuItemDirective', () => {
  let fixture: ComponentFixture<ContextMenuItemTestComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideNoopAnimations(),
      ],
      imports: [ContextMenuItemTestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ContextMenuItemTestComponent);
    element = fixture.nativeElement as HTMLElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(new ContextMenuItemDirective()).toBeTruthy();
  });
  it('should have context-menu-item class', () => {
    expect(element.querySelector('button')).toHaveClass('context-menu-item');
  });
  it('should have CdkMenuItem attached', () => {
    const contextMenuItem = fixture.debugElement.query(
      By.directive(ContextMenuItemDirective)
    );
    expect(contextMenuItem.injector.get(CdkMenuItem)).toBeTruthy();
  });
  it('should apply disabled to CDKContextMenuItem', () => {
    const contextMenuItem = fixture.debugElement.query(
      By.directive(ContextMenuItemDirective)
    );
    expect(contextMenuItem.injector.get(CdkMenuItem).disabled).toBeFalse();
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(contextMenuItem.injector.get(CdkMenuItem).disabled).toBeTrue();
  });
});

@Component({
  template: `
    <div appContextMenu>
      <button appContextMenuItem [disabled]="disabled()">
        Context menu item
      </button>
    </div>
  `,
  imports: [ContextMenuItemDirective, ContextMenuDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuItemTestComponent {
  disabled = signal(false);
}
