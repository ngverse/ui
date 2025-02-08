import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
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
      providers: [provideExperimentalZonelessChangeDetection()],
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

  it('should change spinner radius on [spinnerRadius] change', async () => {
    component.spinnerRadius.set(500);
    await fixture.whenStable();
    const loader = loaderElement.querySelector('.loader') as HTMLElement;
    expect(loader.clientWidth).toBe(500);
    expect(loader.clientHeight).toBe(500);
  });
  it('background should be applied properly', async () => {
    await fixture.whenStable();

    function checkOpacity(opacity: number) {
      expect(
        window
          .getComputedStyle(loaderElement)
          .getPropertyValue('--loader-overlay-opacity')
      ).toBe(opacity.toString());
    }

    checkOpacity(0.1);

    component.transparency.set('full');
    await fixture.whenStable();
    checkOpacity(1);

    component.transparency.set('none');
    await fixture.whenStable();
    checkOpacity(0);
  });

  it('should change parent position to relative', async () => {
    await fixture.whenStable();
    expect(rootContainerElement.style.position).toBe('relative');
  });

  it('should not change position if [useParent] is false', async () => {
    component.useParent.set(false);
    await fixture.whenStable();
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
    ></app-loader>
  </div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class LoaderTestComponent {
  spinnerRadius = signal(200);
  transparency = signal('semi');
  useParent = signal(true);
}
