import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  TemplateRef,
  viewChild,
} from '@angular/core';
import { TooltipContainerComponent } from './tooltip-container.component';

describe('TooltipContainerComponent', () => {
  let component: TooltipContainerComponent;
  let fixture: ComponentFixture<TooltipContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipContainerComponent, TooltipContainerTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipContainerComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add position class to the tooltip container', async () => {
    component.position.set('bottom');
    await fixture.whenStable();
    const tooltipContainer = fixture.nativeElement.querySelector('.tooltip');
    expect(tooltipContainer.classList).toContain('bottom');
  });
  it('should display message in the tooltip container', async () => {
    component.message.set('Hello World');
    await fixture.whenStable();
    const tooltipContainer = fixture.nativeElement.querySelector('.tooltip');
    expect(tooltipContainer.textContent).toContain('Hello World');
  });
  it('should display content in the tooltip container', async () => {
    const fixture = TestBed.createComponent(TooltipContainerTestComponent);
    await fixture.whenStable();

    const tooltipContainer = fixture.nativeElement.querySelector('.tooltip');
    expect(tooltipContainer.textContent).toBe('I am tooltip');
  });
});

@Component({
  imports: [TooltipContainerComponent],
  template: `
    <ng-template #temp>I am tooltip</ng-template>
    <app-tooltip-container></app-tooltip-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class TooltipContainerTestComponent implements AfterViewInit {
  temp = viewChild<TemplateRef<unknown>>('temp');
  tooltipContainer = viewChild(TooltipContainerComponent);

  ngAfterViewInit(): void {
    const temp = this.temp();
    if (temp) {
      this.tooltipContainer()?.content.set(temp);
    }
  }
}
