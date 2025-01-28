import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it("should display message 'Hello, World!'", () => {
    component.message.set('Hello, World!');
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.toast').textContent).toContain(
      'Hello, World!'
    );
  });
  it('should apply action as class', () => {
    component.action.set('success');
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.toast')
        .classList.contains('success')
    ).toBeTrue();
  });
  it("should show close icon when 'showCloseIcon' is true", () => {
    component.showCloseIcon.set(true);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.toast-close-icon')
    ).toBeTruthy();
  });
  it("should hide close icon when 'showCloseIcon' is false", () => {
    component.showCloseIcon.set(false);
    fixture.detectChanges();
    expect(
      fixture.nativeElement.querySelector('.toast-close-icon')
    ).toBeFalsy();
  });
  it("should have role 'alert'", () => {
    fixture.detectChanges();
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
