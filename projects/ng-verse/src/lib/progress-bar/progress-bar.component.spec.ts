import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentRef } from '@angular/core';
import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;
  let componentRef: ComponentRef<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should change the progress bar width on value change', () => {
    componentRef.setInput('value', 50);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.progress-bar');
    expect(element.style.width).toEqual('50%');
  });
  it("should show percentage text if 'showPercentage' is true", () => {
    componentRef.setInput('showPercentage', true);
    componentRef.setInput('value', 50);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.progress-bar');
    expect(element.textContent.trim()).toEqual('50%');
  });
  it("should display indeterminate progress bar if 'indeterminate' is true", () => {
    componentRef.setInput('indeterminate', true);
    fixture.detectChanges();
    const element = fixture.nativeElement.querySelector('.indeterminate-line');
    expect(element).toBeTruthy();
  });
});
