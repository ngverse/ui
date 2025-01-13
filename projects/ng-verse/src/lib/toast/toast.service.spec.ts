import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, DebugElement } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;
  let fixture: ComponentFixture<ToastTestComponent>;
  let documentDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastTestComponent, NoopAnimationsModule],
    }).compileComponents();
    service = TestBed.inject(ToastService);

    fixture = TestBed.createComponent(ToastTestComponent);
    // component = fixture.componentInstance;
    const document: Document = TestBed.inject(DOCUMENT);

    // Wrap the document body in a DebugElement
    documentDebugElement = new DebugElement(document.body);
    fixture.detectChanges();
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
    fixture.detectChanges();
    fixture.detectChanges();
    expect(toastCompInstance().message()).toBe(message);
  });
  it('should close toast automatically after 1 seconds', fakeAsync(() => {
    service.open({
      message: 'Hello, World!',
      closeDelay: 1000,
    });
    fixture.detectChanges();
    fixture.detectChanges();
    expect(toastDebugElement()).toBeTruthy();
    tick(1000);
    expect(toastDebugElement()).toBeNull();
  }));
  it('should pass showCloseIcon to toast', fakeAsync(() => {
    service.open({
      message: 'Hello, World!',
      showCloseIcon: false,
    });
    fixture.detectChanges();
    fixture.detectChanges();
    expect(toastCompInstance().showCloseIcon()).toBe(false);
  }));
  it('should pass action to toast', fakeAsync(() => {
    service.open({
      message: 'Hello, World!',
      action: 'success',
    });
    fixture.detectChanges();
    fixture.detectChanges();
    expect(toastCompInstance().action()).toBe('success');
  }));
  it('should pass position to toast', fakeAsync(() => {
    service.open({
      message: 'Hello, World!',
      position: 'top_left',
    });
    fixture.detectChanges();
    fixture.detectChanges();
    expect(toastCompInstance().tooltipPosition()).toBe('top_left');
  }));
  it('should not close toast if autoClose is false', fakeAsync(() => {
    service.open({
      message: 'Hello, World!',
      autoClose: false,
    });
    fixture.detectChanges();
    fixture.detectChanges();
    expect(toastDebugElement()).toBeTruthy();
    tick(1000);
    expect(toastDebugElement()).toBeTruthy();
  }));
  it('should close previous toast if a new one is opened', fakeAsync(() => {
    service.open({
      message: 'Hello, World!',
    });
    fixture.detectChanges();
    fixture.detectChanges();
    expect(toastDebugElement()).toBeTruthy();
    service.open({
      message: 'Hello, World!',
    });
    fixture.detectChanges();
    fixture.detectChanges();

    expect(document.querySelectorAll('.toast').length).toBe(1);
  }));
  it("should close toast if 'close' event is emitted", fakeAsync(() => {
    service.open({
      message: 'Hello, World!',
    });
    fixture.detectChanges();
    fixture.detectChanges();
    expect(toastDebugElement()).toBeTruthy();
    toastCompInstance().close.emit();
    fixture.detectChanges();
    fixture.detectChanges();
    expect(toastDebugElement()).toBeNull();
  }));
});

@Component({
  imports: [],
  template: `<p>Test</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ToastTestComponent {}
