import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DialogCloseDirective } from '../dialog-close.directive';
import { DialogComponent } from './dialog.component';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;
  let dialogRefMock: {
    close: jasmine.Spy<jasmine.Func>;
    afterClosed: jasmine.Spy<jasmine.Func>;
  };

  beforeEach(async () => {
    dialogRefMock = {
      close: jasmine.createSpy('close'),
      afterClosed: jasmine.createSpy('afterClosed'),
    };

    await TestBed.configureTestingModule({
      imports: [DialogComponent],
      providers: [
        provideNoopAnimations(),
        provideExperimentalZonelessChangeDetection(),
        {
          provide: DialogRef,
          useValue: dialogRefMock,
        },
        {
          provide: DIALOG_DATA,
          useValue: {
            component: DialogTestComponent,
            title: 'Dialog',
            showClose: true,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog', () => {
    const directiveElement = fixture.debugElement.query(
      By.directive(DialogCloseDirective)
    );
    expect(directiveElement).toBeTruthy();
    directiveElement.nativeElement.click();
    expect(dialogRefMock.close).toHaveBeenCalledTimes(1);
  });

  it('should display title', () => {
    expect(fixture.nativeElement.querySelector('p').textContent.trim()).toBe(
      'Dialog'
    );
  });

  it('should display component', () => {
    expect(fixture.nativeElement.textContent).toContain('I am component');
  });
});

@Component({
  template: ` <div>I am component</div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogTestComponent {}
