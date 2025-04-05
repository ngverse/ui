import { Dialog } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogService } from './dialog.service';
import { DialogComponent } from './dialog/dialog.component';

describe('DialogService', () => {
  let service: DialogService;
  let mockDialog: jasmine.SpyObj<Dialog>;

  beforeEach(() => {
    const dialogSpy = jasmine.createSpyObj('Dialog', ['open']);

    TestBed.configureTestingModule({
      providers: [
        DialogService,
        { provide: Dialog, useValue: dialogSpy },
        provideExperimentalZonelessChangeDetection(),
      ],
    });

    service = TestBed.inject(DialogService);
    mockDialog = TestBed.inject(Dialog) as jasmine.SpyObj<Dialog>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#dialog', () => {
    it('should open a dialog with the provided component and options', () => {
      const mockDialogRef = {
        close: jasmine.createSpy(),
        closed: of(undefined),
      };
      mockDialog.open.and.returnValue(mockDialogRef as never);

      const component = {} as ComponentType<unknown>;
      const options = { title: 'Test Title', showClose: true };
      const result = service.dialog(component, options);

      expect(mockDialog.open).toHaveBeenCalledWith(DialogComponent, {
        ...options,
        data: { title: 'Test Title', component, showClose: true },
      });
      expect(result.close).toBe(mockDialogRef.close);
      expect(result.closed).toBe(mockDialogRef.closed);
    });

    it('should default showClose to true when not provided', () => {
      const mockDialogRef = {
        close: jasmine.createSpy(),
        closed: of(undefined),
      };
      mockDialog.open.and.returnValue(mockDialogRef as never);

      const component = {} as ComponentType<unknown>;
      const options = { title: 'Test Title' };
      service.dialog(component, options);

      expect(mockDialog.open).toHaveBeenCalledWith(DialogComponent, {
        ...options,
        data: { title: 'Test Title', component, showClose: true },
      });
    });
  });

  describe('#confirm', () => {
    it('should open a confirm dialog with the provided options', () => {
      const mockDialogRef = { close: jasmine.createSpy(), closed: of(true) };
      mockDialog.open.and.returnValue(mockDialogRef as never);

      const options = {
        title: 'Confirm Title',
        description: 'Confirm Description',
        yesLabel: 'Confirm',
        noLabel: 'Cancel',
      };
      const result = service.confirm(options);

      expect(mockDialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
        data: {
          title: 'Confirm Title',
          description: 'Confirm Description',
          yesLabel: 'Confirm',
          noLabel: 'Cancel',
        },
        disableClose: false,
        hasBackdrop: true,
      });
      expect(result.close).toBe(mockDialogRef.close);
      expect(result.closed).toBe(mockDialogRef.closed);
    });

    it('should use default yesLabel and noLabel when not provided', () => {
      const mockDialogRef = { close: jasmine.createSpy(), closed: of(false) };
      mockDialog.open.and.returnValue(mockDialogRef as never);

      const options = {
        title: 'Default Labels',
        description: 'No labels provided',
      };
      service.confirm(options);

      expect(mockDialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, {
        data: {
          title: 'Default Labels',
          description: 'No labels provided',
          yesLabel: 'Yes',
          noLabel: 'No',
        },
        disableClose: false,
        hasBackdrop: true,
      });
    });
  });

  describe('#alert', () => {
    it('should open an alert dialog with the provided options', () => {
      const mockDialogRef = {
        close: jasmine.createSpy(),
        closed: of(undefined),
      };
      mockDialog.open.and.returnValue(mockDialogRef as never);

      const options = {
        title: 'Alert Title',
        description: 'Alert Description',
        buttonLabel: 'Close',
      };
      const result = service.alert(options);

      expect(mockDialog.open).toHaveBeenCalledWith(AlertDialogComponent, {
        data: {
          title: 'Alert Title',
          description: 'Alert Description',
          buttonLabel: 'Close',
        },
        disableClose: false,
        hasBackdrop: true,
        backdropClass: 'cdk-backdrop-transparent',
      });
      expect(result.close).toBe(mockDialogRef.close);
      expect(result.closed).toBe(mockDialogRef.closed);
    });

    it('should use default buttonLabel when not provided', () => {
      const mockDialogRef = {
        close: jasmine.createSpy(),
        closed: of(undefined),
      };
      mockDialog.open.and.returnValue(mockDialogRef as never);

      const options = {
        title: 'Default Button Label',
        description: 'No button label provided',
      };
      service.alert(options);

      expect(mockDialog.open).toHaveBeenCalledWith(AlertDialogComponent, {
        data: {
          title: 'Default Button Label',
          description: 'No button label provided',
          buttonLabel: 'OK',
        },
        disableClose: false,
        hasBackdrop: true,
        backdropClass: 'cdk-backdrop-transparent',
      });
    });
  });
});
