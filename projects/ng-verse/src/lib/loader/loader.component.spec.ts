import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderTestComponent;
  let fixture: ComponentFixture<LoaderTestComponent>;
  let rootElement: HTMLElement;
  let loaderElement: HTMLElement;
  let rootContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderTestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderTestComponent);
    component = fixture.componentInstance;
    rootElement = fixture.nativeElement as HTMLElement;
    loaderElement = rootElement.querySelector('app-loader') as HTMLElement;
    rootContainerElement = rootElement.querySelector(
      '#rootContainer'
    ) as HTMLElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader on [loader]=true', () => {
    component.showLoading.set(true);
    fixture.detectChanges();
    expect(loaderElement).toBeTruthy();
  });
  it('should change spinner radius on [spinnerRadius] change', () => {
    component.showLoading.set(true);
    component.spinnerRadius.set(500);
    fixture.detectChanges();
    const loader = loaderElement.querySelector('.loader') as HTMLElement;

    expect(loader.clientWidth).toBe(500);
    expect(loader.clientHeight).toBe(500);
  });
  it('background should be applied properly', () => {
    component.showLoading.set(true);
    fixture.detectChanges();

    function checkOpacity(opacity: number) {
      expect(
        window
          .getComputedStyle(loaderElement)
          .getPropertyValue('--loader-overlay-opacity')
      ).toBe(opacity.toString());
    }

    checkOpacity(0.7);

    component.transparency.set('full');
    fixture.detectChanges();
    checkOpacity(1);

    component.transparency.set('none');
    fixture.detectChanges();
    checkOpacity(0);
  });

  it('should change parent position to relative', () => {
    fixture.detectChanges();

    expect(rootContainerElement.style.position).toBe('relative');
  });

  it('should not change position if [useParent] is false', () => {
    component.useParent.set(false);
    fixture.detectChanges();
    expect(rootContainerElement.style.position).not.toBe('relative');
  });
});

@Component({
  imports: [LoaderComponent],
  template: `<div id="rootContainer">
    <button (click)="show()">Show Loader</button>
    <app-loader
      [useParent]="useParent()"
      [transparency]="transparency()"
      [radius]="spinnerRadius()"
      [loading]="showLoading()"
    ></app-loader>
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LoaderTestComponent {
  showLoading = signal(false);
  spinnerRadius = signal(200);
  transparency = signal('semi');
  useParent = signal(true);
}
