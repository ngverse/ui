import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  ComponentRef,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;
  let componentRef: ComponentRef<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should display indeterminate progress bar if 'indeterminate' is true", async () => {
    componentRef.setInput('indeterminate', true);
    await fixture.whenStable();
    const element = fixture.nativeElement.querySelector('.inc');
    expect(element).toBeTruthy();
  });
});
