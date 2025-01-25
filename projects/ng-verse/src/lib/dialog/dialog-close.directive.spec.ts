import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DialogCloseDirective } from './dialog-close.directive';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  template: ` <button appDialogClose [appDialogClose]="value()">Test</button>`,
  imports: [DialogCloseDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TestCloseComponent {
  value = signal<string | undefined>(undefined);
}

describe('DialogCloseDirective', () => {
  let fixture: ComponentFixture<TestCloseComponent>;
  let mockDialogRef: jasmine.SpyObj<DialogRef>;

  beforeEach(() => {
    mockDialogRef = jasmine.createSpyObj('DialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [TestCloseComponent],
      providers: [{ provide: DialogRef, useValue: mockDialogRef }],
    });

    fixture = TestBed.createComponent(TestCloseComponent);
    fixture.detectChanges();
  });

  it('should create the directive', () => {
    const directiveEl = fixture.debugElement.query(
      By.directive(DialogCloseDirective)
    );
    expect(directiveEl).toBeTruthy();
  });

  it('should call dialogRef.close() with undefined when clicked and no value is set', () => {
    const buttonEl = fixture.debugElement.query(
      By.directive(DialogCloseDirective)
    );
    buttonEl.triggerEventHandler('click', null);

    expect(mockDialogRef.close).toHaveBeenCalledWith(undefined);
  });

  it('should call dialogRef.close() with the provided value when clicked', () => {
    const buttonEl = fixture.debugElement.query(
      By.directive(DialogCloseDirective)
    );

    fixture.componentInstance.value.set('Test Value');
    fixture.detectChanges();

    // Trigger the click event
    buttonEl.triggerEventHandler('click', null);

    expect(mockDialogRef.close).toHaveBeenCalledWith('Test Value');
  });
});
