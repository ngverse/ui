import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from '../dialog.service';

describe('AlertDialogComponent', () => {
  let dialogService: DialogService;
  let fixture: ComponentFixture<AlertDialogTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDialogTestComponent, BrowserAnimationsModule],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(AlertDialogTestComponent);

    await fixture.whenStable();
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
    expect(document.querySelector('app-alert-dialog')).toBeTruthy();
  });

  it('title should be displayed', async () => {
    openAlert({
      title: 'Title text',
      description: '',
    });
    await fixture.whenStable();
    expect(document.querySelector('h2')?.textContent).toBe('Title text');
  });

  it('description should be displayed', async () => {
    openAlert({
      description: 'This is description',
    });
    await fixture.whenStable();

    expect(document.querySelector('p')?.textContent).toBe(
      'This is description'
    );
  });

  it('button labels should be OK by default', async () => {
    openAlert();
    await fixture.whenStable();

    const buttons = document.querySelectorAll('button');

    expect(buttons[0].textContent?.trim()).toBe('OK');
  });

  it('custom button labels should be displayed', async () => {
    openAlert({
      buttonLabel: 'Save',
    });
    await fixture.whenStable();

    const buttons = document.querySelectorAll('button');

    expect(buttons[0].textContent?.trim()).toBe('Save');
  });

  it('button click should close the alert', async () => {
    openAlert();
    await fixture.whenStable();

    const yesButton = document.querySelector('button') as HTMLElement;
    yesButton.dispatchEvent(new Event('click'));
    await fixture.whenStable();

    expect(document.querySelector('.alert')).toBeFalsy();
  });
});

@Component({
  template: `<div></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AlertDialogTestComponent {}
