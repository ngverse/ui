import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarPageComponent } from './progress-bar-page.component';

describe('ProgressBarPageComponent', () => {
  let component: ProgressBarPageComponent;
  let fixture: ComponentFixture<ProgressBarPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressBarPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
