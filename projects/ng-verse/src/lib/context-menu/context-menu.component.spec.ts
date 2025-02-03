import { OverlayContainer } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ContextMenuItemComponent } from './context-menu-item.component';
import { ContextMenuTriggerDirective } from './context-menu-trigger.directive';
import { ContextMenuComponent } from './context-menu.component';

describe('ContextMenuComponent', () => {
  let component: ContextMenuTestComponent;
  let fixture: ComponentFixture<ContextMenuTestComponent>;
  let overlayContainer: OverlayContainer;

  function getOverlayContainerEl() {
    return overlayContainer.getContainerElement();
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextMenuComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideNoopAnimations(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContextMenuTestComponent);
    overlayContainer = TestBed.inject(OverlayContainer);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should open context menu on context menu event', async () => {
    await fixture.whenStable();
    const context = fixture.nativeElement.querySelector(
      'p[appContextMenuTrigger]'
    );
    context.dispatchEvent(new Event('contextmenu'));
    await fixture.whenStable();
    expect(
      fixture.nativeElement.querySelector('app-context-menu')
    ).toBeTruthy();
  });
  it('should render items on open', async () => {
    await fixture.whenStable();
    const context = fixture.nativeElement.querySelector(
      'p[appContextMenuTrigger]'
    );
    context.dispatchEvent(new Event('contextmenu'));
    await fixture.whenStable();
    const items = getOverlayContainerEl().querySelectorAll(
      'app-context-menu-item'
    );
    expect(items.length).toBe(2);
  });
});

@Component({
  template: `
    <p appContextMenuTrigger #content #trigger="appContextMenuTrigger">
      Context Menu Trigger
    </p>
    <app-context-menu [trigger]="trigger">
      <app-context-menu-item>Copy</app-context-menu-item>
      <app-context-menu-item>Mark as Red</app-context-menu-item>
    </app-context-menu>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ContextMenuComponent,
    ContextMenuItemComponent,
    ContextMenuTriggerDirective,
  ],
})
export class ContextMenuTestComponent {}
