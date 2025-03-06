import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from '../dialog.service';

describe('ConfirmDialogComponent', () => {
  let dialogService: DialogService;
  let fixture: ComponentFixture<ConfirmDialogTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogTestComponent, BrowserAnimationsModule],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();
    fixture = TestBed.createComponent(ConfirmDialogTestComponent);

    dialogService = TestBed.inject(DialogService);
  });

  function openConfirm(data?: {
    title?: string;
    description?: string;
    yesLabel?: string;
    noLabel?: string;
  }) {
    return dialogService.confirm({
      title: data?.title ?? 'Title text',
      description: data?.description ?? 'This is description',
      yesLabel: data?.yesLabel,
      noLabel: data?.noLabel,
    });
  }

  it('should be created', () => {
    openConfirm();
    expect(document.querySelector('div')).toBeTruthy();
  });

  it('title should be displayed', async () => {
    openConfirm({
      title: 'Title text',
      description: '',
    });
    await fixture.whenStable();
    expect(document.querySelector('h2')?.textContent).toBe('Title text');
  });

  it('description should be displayed', async () => {
    openConfirm({
      description: 'This is description',
    });
    await fixture.whenStable();
    expect(document.querySelector('p')?.textContent).toBe(
      'This is description'
    );
  });

  it('button labels should be Yes/No by default', async () => {
    openConfirm();
    await fixture.whenStable();
    const buttons = document.querySelectorAll('button');

    expect(buttons[0].textContent?.trim()).toBe('Yes');
    expect(buttons[1].textContent?.trim()).toBe('No');
  });

  it('custom button labels should be displayed', async () => {
    openConfirm({
      yesLabel: 'Save',
      noLabel: 'Cancel',
    });
    await fixture.whenStable();
    const buttons = document.querySelectorAll('button');

    expect(buttons[0].textContent?.trim()).toBe('Save');
    expect(buttons[1].textContent?.trim()).toBe('Cancel');
  });

  it('yes button click should return true on close', async () => {
    const dialogRef = openConfirm();
    await fixture.whenStable();
    const yesButton = document.querySelector('button') as HTMLElement;

    dialogRef.closed.subscribe((value) => {
      expect(value).toBeTrue();
    });

    yesButton.dispatchEvent(new Event('click'));
  });
  it('no button click should return false on close', () => {
    const dialogRef = openConfirm();
    const yesButton = document.querySelectorAll('button')[1] as HTMLElement;

    dialogRef.closed.subscribe((value) => {
      expect(value).toBeFalse();
    });

    yesButton.dispatchEvent(new Event('click'));
  });
});

@Component({
  template: `<div></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class ConfirmDialogTestComponent {}
