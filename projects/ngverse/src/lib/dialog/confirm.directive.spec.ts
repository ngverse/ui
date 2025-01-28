import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDirective } from './confirm.directive';
import { DialogService } from './dialog.service';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

class MockDialogService {
  confirm = jasmine.createSpy().and.returnValue({
    closed: of(true),
  });
}

@Component({
  template: ` <button
    appConfirm
    [confirmOptions]="options"
    (approved)="onApproved()"
    (rejected)="onRejected()"
  >
    Click me
  </button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ConfirmDirective],
})
class TestHostComponent {
  options = {
    title: 'Delete this item?',
    description: 'Once deleted you cannot undo this action',
    yesLabel: 'Delete',
    noLabel: 'Cancel',
  };
  @Output() approved = new EventEmitter<void>();
  @Output() rejected = new EventEmitter<void>();

  onApproved() {
    this.approved.emit();
  }

  onRejected() {
    this.rejected.emit();
  }
}

describe('ConfirmDirective', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let dialogService: MockDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [{ provide: DialogService, useClass: MockDialogService }],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    dialogService = TestBed.inject(
      DialogService
    ) as unknown as MockDialogService;

    fixture.detectChanges();
  });

  it('should call the open method when the button is clicked', () => {
    const button = fixture.debugElement.query(By.css('button'));
    spyOn(fixture.componentInstance, 'onApproved');

    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(dialogService.confirm).toHaveBeenCalledWith(
      fixture.componentInstance.options
    );
  });

  it('should emit approved event when the dialog result is true', () => {
    dialogService.confirm.and.returnValue({
      closed: of(true),
    });

    const button = fixture.debugElement.query(By.css('button'));
    const approvedSpy = spyOn(fixture.componentInstance, 'onApproved');

    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(approvedSpy).toHaveBeenCalled();
  });

  it('should emit rejected event when the dialog result is false', () => {
    dialogService.confirm.and.returnValue({
      closed: of(false),
    });

    const button = fixture.debugElement.query(By.css('button'));
    const rejectedSpy = spyOn(fixture.componentInstance, 'onRejected');

    button.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(rejectedSpy).toHaveBeenCalled();
  });
});
