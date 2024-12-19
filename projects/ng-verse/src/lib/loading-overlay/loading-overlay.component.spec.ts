import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component, signal } from '@angular/core';
import { LoadingOverlayComponent } from './loading-overlay.component';

describe('LoadingOverlayComponent', () => {
  let component: LoadingOverlayTestComponent;
  let fixture: ComponentFixture<LoadingOverlayTestComponent>;
  let rootElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingOverlayTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingOverlayTestComponent);
    component = fixture.componentInstance;
    rootElement = fixture.nativeElement as HTMLElement;
  });

  function loadingOverlayElement() {
    return rootElement.querySelector('.loading-overlay') as HTMLElement;
  }

  function rootContainerElement() {
    return rootElement.querySelector('#rootContainer') as HTMLElement;
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading on [loading]=true', () => {
    component.showLoading.set(true);
    fixture.detectChanges();
    expect(loadingOverlayElement()).toBeTruthy();
  });
  it('should change spinner radius on [spinnerRadius] change', () => {
    component.showLoading.set(true);
    component.spinnerRadius.set(500);
    fixture.detectChanges();
    const loaderElement = loadingOverlayElement().querySelector(
      '.loader'
    ) as HTMLElement;

    expect(loaderElement.clientWidth).toBe(500);
    expect(loaderElement.clientHeight).toBe(500);
  });
  it('background should be applied properly', () => {
    component.showLoading.set(true);
    fixture.detectChanges();
    const overlayElement = loadingOverlayElement();

    function checkOpacity(opacity: number) {
      expect(
        window
          .getComputedStyle(overlayElement)
          .getPropertyValue('--loading-overlay-opacity')
      ).toBe(opacity.toString());
    }

    checkOpacity(0.7);

    component.background.set('full');
    fixture.detectChanges();
    checkOpacity(1);

    component.background.set('none');
    fixture.detectChanges();
    checkOpacity(0);
  });

  it('should change parent position to relative', () => {
    fixture.detectChanges();

    expect(rootContainerElement().style.position).toBe('relative');
  });

  it('should not change position if [useParent] is false', () => {
    component.useParent.set(false);
    fixture.detectChanges();
    expect(rootContainerElement().style.position).not.toBe('relative');
  });
});

@Component({
  imports: [LoadingOverlayComponent],
  template: `<div id="rootContainer">
    <button (click)="show()">Show Loader</button>
    <app-loading-overlay
      [useParent]="useParent()"
      [background]="background()"
      [spinnerRadius]="spinnerRadius()"
      [loading]="showLoading()"
    ></app-loading-overlay>
  </div> `,
})
class LoadingOverlayTestComponent {
  showLoading = signal(false);
  spinnerRadius = signal(200);
  background = signal('semi');
  useParent = signal(true);

  show() {
    this.showLoading.set(true);
    setTimeout(() => {
      this.showLoading.set(false);
    }, 3000);
  }
}
