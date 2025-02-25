import { CdkContextMenuTrigger } from '@angular/cdk/menu';
import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ContextMenuTriggerDirective } from './context-menu-trigger.directive';

describe('ContextMenuTriggerDirective', () => {
  let fixture: ComponentFixture<ContextMenuTriggerTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideNoopAnimations(),
      ],
      imports: [ContextMenuTriggerTestComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ContextMenuTriggerTestComponent);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(new ContextMenuTriggerDirective()).toBeTruthy();
  });

  it('should have CdkContextMenuTrigger attached', () => {
    const contextMenuTrigger = fixture.debugElement.query(
      By.directive(ContextMenuTriggerDirective)
    );
    expect(contextMenuTrigger.injector.get(CdkContextMenuTrigger)).toBeTruthy();
  });
  it('should attach ng-template to CDKContextMenu', () => {
    const contextMenuTrigger = fixture.debugElement.query(
      By.directive(ContextMenuTriggerDirective)
    );
    const contextMenu = contextMenuTrigger.injector.get(CdkContextMenuTrigger);
    expect(contextMenu.menuTemplateRef).toBeTruthy();
  });
});

@Component({
  template: `
    <p [appContextMenuTrigger]="content">Right click to open context menu</p>
    <ng-template #content> </ng-template>
  `,
  imports: [ContextMenuTriggerDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContextMenuTriggerTestComponent {}
