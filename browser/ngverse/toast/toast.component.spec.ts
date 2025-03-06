import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
      imports: [ToastComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should display message 'Hello, World!'", async () => {
    component.message.set('Hello, World!');
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).toContain('Hello, World!');
  });
  it('should apply action as class', async () => {
    component.type.set('success');
    await fixture.whenStable();
    expect(fixture.nativeElement.classList.contains('success')).toBeTrue();
  });
  it("should show close icon when 'showCloseIcon' is true", async () => {
    component.showCloseIcon.set(true);
    await fixture.whenStable();

    expect(
      fixture.nativeElement.querySelector('.toast-close-icon')
    ).toBeTruthy();
  });
  it("should hide close icon when 'showCloseIcon' is false", async () => {
    component.showCloseIcon.set(false);
    await fixture.whenStable();

    expect(
      fixture.nativeElement.querySelector('.toast-close-icon')
    ).toBeFalsy();
  });
  it("should have role 'alert'", () => {
    expect(fixture.nativeElement.getAttribute('role')).toBe('alert');
  });
  it("click close icon should emit 'close' event", async () => {
    await fixture.whenStable();
    const spy = spyOn(component, 'exit');
    fixture.nativeElement.querySelector('.toast-close-icon').click();
    expect(spy).toHaveBeenCalled();
  });
});
