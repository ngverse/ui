import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogService } from '../dialog.service';

describe('ConfirmDialogComponent', () => {
  let dialogService: DialogService;
  let fixture: ComponentFixture<ConfirmDialogTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogTestComponent, BrowserAnimationsModule],
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
    expect(document.querySelector('.confirm')).toBeTruthy();
  });

  it('title should be displayed', () => {
    openConfirm({
      title: 'Title text',
      description: '',
    });
    fixture.detectChanges();
    expect(document.querySelector('.confirm-title')?.textContent).toBe(
      'Title text'
    );
  });

  it('description should be displayed', () => {
    openConfirm({
      description: 'This is description',
    });
    fixture.detectChanges();
    expect(document.querySelector('.confirm-description')?.textContent).toBe(
      'This is description'
    );
  });

  it('button labels should be Yes/No by default', () => {
    openConfirm();
    fixture.detectChanges();
    const buttons = document.querySelectorAll('.confirm-action');

    expect(buttons[0].textContent?.trim()).toBe('Yes');
    expect(buttons[1].textContent?.trim()).toBe('No');
  });

  it('custom button labels should be displayed', () => {
    openConfirm({
      yesLabel: 'Save',
      noLabel: 'Cancel',
    });
    fixture.detectChanges();
    const buttons = document.querySelectorAll('.confirm-action');

    expect(buttons[0].textContent?.trim()).toBe('Save');
    expect(buttons[1].textContent?.trim()).toBe('Cancel');
  });

  it('yes button click should return true on close', () => {
    const dialogRef = openConfirm();
    fixture.detectChanges();
    const yesButton = document.querySelector('.confirm-action') as HTMLElement;

    dialogRef.closed.subscribe((value) => {
      expect(value).toBeTrue();
    });

    yesButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
  });
  it('no button click should return false on close', () => {
    const dialogRef = openConfirm();
    fixture.detectChanges();
    const yesButton = document.querySelectorAll(
      '.confirm-action'
    )[1] as HTMLElement;

    dialogRef.closed.subscribe((value) => {
      expect(value).toBeFalse();
    });

    yesButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
  });
});

@Component({
  template: `<div></div>`,
})
class ConfirmDialogTestComponent {}
