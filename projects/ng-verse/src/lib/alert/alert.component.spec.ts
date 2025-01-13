import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AlertBodyComponent } from './alert-body/alert-body.component';
import { AlertHeaderComponent } from './alert-header/alert-header.component';
import { ALERT_TYPES, AlertComponent } from './alert.component';

describe('AlertComponent', () => {
  let component: AlertTestComponent;
  let fixture: ComponentFixture<AlertTestComponent>;
  let alertRootElement: HTMLElement;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlertTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.nativeElement as HTMLElement;
    alertRootElement = fixture.nativeElement.querySelector(
      '.alert'
    ) as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change class based on type', () => {
    component.type.set('success');
    fixture.detectChanges();
    expect(alertRootElement.classList.contains('success')).toBeTrue();
  });
  it('should render header', () => {
    const header = nativeElement.querySelector(
      'app-alert-header'
    ) as HTMLElement;

    expect(header.textContent?.trim()).toBe('I am header');
  });
  it('should render body', () => {
    const body = nativeElement.querySelector('app-alert-body') as HTMLElement;
    expect(body.textContent?.trim()).toBe('I am body');
  });
});

@Component({
  imports: [AlertComponent, AlertHeaderComponent, AlertBodyComponent],
  template: `<app-alert [type]="type()">
    <app-alert-header>I am header </app-alert-header>
    <app-alert-body> I am body </app-alert-body>
  </app-alert>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class AlertTestComponent {
  type = signal<ALERT_TYPES>('default');
}
