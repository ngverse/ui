import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from '../dialog.service';

describe('AlertDialogComponent', () => {
  let dialogService: DialogService;
  let fixture: ComponentFixture<AlertDialogTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogTestComponent, BrowserAnimationsModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AlertDialogTestComponent);

    dialogService = TestBed.inject(DialogService);
  });

  function openAlert(data?: {
    title?: string;
    description?: string;
    buttonLabel?: string;
  }) {
    return dialogService.alert({
      title: data?.title ?? 'Title text',
      description: data?.description ?? 'This is description',
      buttonLabel: data?.buttonLabel,
    });
  }

  it('should be created', () => {
    openAlert();
    expect(document.querySelector('.alert')).toBeTruthy();
  });

  it('title should be displayed', () => {
    openAlert({
      title: 'Title text',
      description: '',
    });
    fixture.detectChanges();
    expect(document.querySelector('.alert-title')?.textContent).toBe(
      'Title text'
    );
  });

  it('description should be displayed', () => {
    openAlert({
      description: 'This is description',
    });
    fixture.detectChanges();
    expect(document.querySelector('.alert-description')?.textContent).toBe(
      'This is description'
    );
  });

  it('button labels should be OK by default', () => {
    openAlert();
    fixture.detectChanges();
    const buttons = document.querySelectorAll('.alert-action');

    expect(buttons[0].textContent?.trim()).toBe('OK');
  });

  it('custom button labels should be displayed', () => {
    openAlert({
      buttonLabel: 'Save',
    });
    fixture.detectChanges();
    const buttons = document.querySelectorAll('.alert-action');

    expect(buttons[0].textContent?.trim()).toBe('Save');
  });

  it('button click should close the alert', () => {
    openAlert();
    fixture.detectChanges();
    const yesButton = document.querySelector('.alert-action') as HTMLElement;
    yesButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(document.querySelector('.alert')).toBeFalsy();
  });
});

@Component({
  template: `<div></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AlertDialogTestComponent {}
