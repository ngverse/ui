import {
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ListboxRegistry } from '../listbox/listbox-registry';
import { ContextMenuItemComponent } from './context-menu-item.component';
import { ContextMenuComponent } from './context-menu.component';

describe('ContextMenuItemComponent', () => {
  let component: ContextMenuItemComponent;
  let fixture: ComponentFixture<ContextMenuItemComponent>;
  const contextMenu = {
    isOpen: signal(true),
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContextMenuItemComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideNoopAnimations(),
        ContextMenuComponent,
        ListboxRegistry,
        { provide: ContextMenuComponent, useValue: contextMenu },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContextMenuItemComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should disable button on disabled=[true]', async () => {
    fixture.componentRef.setInput('disabled', true);
    await fixture.whenStable();
    const button = fixture.nativeElement.querySelector(
      'button'
    ) as HTMLButtonElement;
    expect(button.disabled).toBeTrue();
  });

  it('should set isOpen to false on click', async () => {
    await fixture.whenStable();

    fixture.nativeElement.dispatchEvent(new Event('click'));
    await fixture.whenStable();
    expect(contextMenu.isOpen()).toBeFalse();
  });
});
