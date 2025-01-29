import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastComponent } from './toast.component';

xdescribe('ToastComponent', () => {
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
  it("should display message 'Hello, World!'", () => {
    component.message.set('Hello, World!');
    expect(fixture.nativeElement.querySelector('.toast').textContent).toContain(
      'Hello, World!'
    );
  });
  it('should apply action as class', () => {
    component.action.set('success');
    expect(
      fixture.nativeElement
        .querySelector('.toast')
        .classList.contains('success')
    ).toBeTrue();
  });
  it("should show close icon when 'showCloseIcon' is true", () => {
    component.showCloseIcon.set(true);
    expect(
      fixture.nativeElement.querySelector('.toast-close-icon')
    ).toBeTruthy();
  });
  it("should hide close icon when 'showCloseIcon' is false", () => {
    component.showCloseIcon.set(false);
    expect(
      fixture.nativeElement.querySelector('.toast-close-icon')
    ).toBeFalsy();
  });
  it("should have role 'alert'", () => {
    expect(
      fixture.nativeElement.querySelector('.toast').getAttribute('role')
    ).toBe('alert');
  });
  it("click close icon should emit 'close' event", () => {
    const spy = spyOn(component, 'startCloseAnimation');
    fixture.nativeElement.querySelector('.toast-close-icon').click();
    expect(spy).toHaveBeenCalled();
  });
});
