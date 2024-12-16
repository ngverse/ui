import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, DebugElement, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonTestComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let rootComponent: ButtonTestComponent;
  let buttonComponent: ButtonComponent;
  let buttonRootElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ButtonComponent],
    });
    fixture = TestBed.createComponent(ButtonTestComponent);
    debugElement = fixture.debugElement;
    htmlElement = fixture.debugElement.nativeElement;
    rootComponent = fixture.componentInstance;
    buttonComponent = debugElement.query(By.directive(ButtonComponent))
      .componentInstance as ButtonComponent;
    buttonRootElement = htmlElement.querySelector('button') as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(buttonComponent).toBeTruthy();
  });

  it('should add disable attribute on disable', () => {
    rootComponent.disabled.set(true);
    fixture.detectChanges();
    expect(buttonRootElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should add outline class on variant type change', () => {
    rootComponent.variant.set('outline');
    fixture.detectChanges();
    expect(buttonRootElement.classList.contains('outline')).toBeTrue();
  });
  it('should add proper color type', () => {
    rootComponent.color.set('secondary');
    fixture.detectChanges();
    expect(buttonRootElement.classList.contains('secondary')).toBeTrue();
  });
  it('should add proper button type', () => {
    rootComponent.type.set('submit');
    fixture.detectChanges();
    expect(buttonRootElement.getAttribute('type')).toBe('submit');
  });
  it('should show spinner on loading', () => {
    rootComponent.loading.set(true);
    fixture.detectChanges();
    const hasButtonLoader =
      buttonRootElement.querySelector('.button-loader') !== null;

    expect(hasButtonLoader).toBeTrue();
  });

  it('should display text in button', () => {
    expect(buttonRootElement.textContent?.trim()).toBe('Test Button');
  });
  it('should change the size class', () => {
    rootComponent.size.set('lg');
    fixture.detectChanges();
    expect(buttonRootElement.classList.contains('lg')).toBeTrue();
  });
});

@Component({
  imports: [ButtonComponent],
  template: `<app-button
    [color]="color()"
    [variant]="variant()"
    [disabled]="disabled()"
    [type]="type()"
    [loading]="loading()"
    [size]="size()"
  >
    Test Button
  </app-button>`,
})
class ButtonTestComponent {
  disabled = signal<boolean>(false);
  variant = signal<string | undefined>('fill');
  color = signal<string | undefined>('primary');
  type = signal<string>('button');
  loading = signal(false);
  size = signal<string>('sm');
}
