import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  let fixture: ComponentFixture<ToastTestComponent>;
  let documentDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastTestComponent],
      providers: [
        provideNoopAnimations(),
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();
    service = TestBed.inject(ToastService);

    fixture = TestBed.createComponent(ToastTestComponent);
    // component = fixture.componentInstance;
    const document: Document = TestBed.inject(DOCUMENT);

    // Wrap the document body in a DebugElement
    documentDebugElement = new DebugElement(document.body);
  });

  function toastDebugElement() {
    return documentDebugElement.query(By.directive(ToastComponent));
  }

  function toastCompInstance() {
    return toastDebugElement().componentInstance as ToastComponent;
  }

  it('should create', () => {
    expect(service).toBeTruthy();
  });
  it('should pass message to toast', () => {
    const message = 'Hello!';
    service.open({
      message,
    });
    expect(toastCompInstance().message()).toBe(message);
  });
  it('should close toast automatically after 10ms', async () => {
    service.open({
      message: 'Hello, World!',
      closeDelay: 10,
    });
    expect(toastDebugElement()).toBeTruthy();
    toastDebugElement().triggerEventHandler('animationend', {
      animationName: '_toast-exit',
    });
    await new Promise<void>((resolve) => setTimeout(resolve, 10));
    await fixture.whenStable();
    expect(toastDebugElement()).toBeNull();
  });
  it('should pass showCloseIcon to toast', async () => {
    service.open({
      message: 'Hello, World!',
      showCloseIcon: false,
    });
    expect(toastCompInstance().showCloseIcon()).toBe(false);
  });
  it('should pass action to toast', async () => {
    service.open({
      message: 'Hello, World!',
      type: 'success',
    });
    expect(toastCompInstance().type()).toBe('success');
  });
  it('should pass position to toast', async () => {
    service.open({
      message: 'Hello, World!',
      position: 'top_left',
    });
    expect(toastCompInstance().position()).toBe('top_left');
  });
  it('should not close toast if autoClose is false', async () => {
    service.open({
      message: 'Hello, World!',
      autoClose: false,
      closeDelay: 10,
    });
    expect(toastDebugElement()).toBeTruthy();
    await new Promise<void>((resolve) => setTimeout(resolve, 10));
    await fixture.whenStable();
    expect(toastDebugElement()).toBeTruthy();
  });
  it('should close previous toast if a new one is opened', async () => {
    service.open({
      message: 'Hello, World!',
    });

    expect(toastDebugElement()).toBeTruthy();
    service.open({
      message: 'Hello, World!',
    });

    expect(document.querySelectorAll('app-toast').length).toBe(1);
  });
  it("should close toast if 'close' event is emitted", async () => {
    service.open({
      message: 'Hello, World!',
    });
    expect(toastDebugElement()).toBeTruthy();
    toastCompInstance().exit();
    await fixture.whenStable();
    expect(toastDebugElement()).toBeNull();
  });
});

@Component({
  imports: [],
  template: `<p>Test</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ToastTestComponent {}
