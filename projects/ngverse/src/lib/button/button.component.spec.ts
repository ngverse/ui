import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  input,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let fixture: ComponentFixture<ButtonTestComponent>;
  let debugElement: DebugElement;
  let htmlElement: HTMLElement;
  let rootComponent: ButtonTestComponent;
  let buttonComponent: ButtonComponent;
  let buttonRootElement: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ButtonComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    fixture = TestBed.createComponent(ButtonTestComponent);
    await fixture.whenStable();

    debugElement = fixture.debugElement;
    htmlElement = fixture.debugElement.nativeElement;
    rootComponent = fixture.componentInstance;
    buttonComponent = debugElement.query(By.directive(ButtonComponent))
      .componentInstance as ButtonComponent;
    buttonRootElement = htmlElement.querySelector('button') as HTMLElement;
  });

  function getClassName(className: string) {
    return `btn-${className}`;
  }

  it('should create', () => {
    expect(buttonComponent).toBeTruthy();
  });

  it('should add disable attribute on disable', () => {
    rootComponent.disabled.set(true);
    expect(buttonRootElement.hasAttribute('disabled')).toBeTrue();
  });

  it('should add outline class on variant type change', async () => {
    rootComponent.variant.set('outline');
    await fixture.whenStable();
    expect(
      buttonRootElement.classList.contains(getClassName('outline'))
    ).toBeTrue();
  });
  it('should add proper color type', async () => {
    rootComponent.color.set('secondary');
    await fixture.whenStable();
    expect(
      buttonRootElement.classList.contains(getClassName('secondary'))
    ).toBeTrue();
  });
  it('should add proper button type', async () => {
    rootComponent.type.set('submit');
    await fixture.whenStable();
    expect(buttonRootElement.getAttribute('type')).toBe('submit');
  });
  it('should show spinner on loading', async () => {
    rootComponent.loading.set(true);
    await fixture.whenStable();
    const hasButtonLoader =
      buttonRootElement.querySelector('.button-loader') !== null;

    expect(hasButtonLoader).toBeTrue();
  });

  it('should display text in button', () => {
    expect(buttonRootElement.textContent?.trim()).toBe('Test Button');
  });
  it('should change the size class', async () => {
    fixture.componentRef.setInput('size', 'lg');
    await fixture.whenStable();
    expect(buttonRootElement.classList.contains(getClassName('lg'))).toBeTrue();
  });
});

@Component({
  imports: [ButtonComponent],
  template: `<button
    appButton
    [color]="color()"
    [variant]="variant()"
    [disabled]="disabled()"
    [type]="type()"
    [loading]="loading()"
    [size]="size()"
  >
    Test Button
  </button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ButtonTestComponent {
  disabled = signal<boolean>(false);
  variant = signal<string | undefined>('fill');
  color = signal<string | undefined>('primary');
  type = signal<string>('button');
  loading = signal(false);
  size = input<string>('sm');
}
