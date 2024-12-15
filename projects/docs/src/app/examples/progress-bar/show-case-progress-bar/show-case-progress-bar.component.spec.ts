import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCaseProgressBarComponent } from './show-case-progress-bar.component';

describe('ShowCaseProgressBarComponent', () => {
  let component: ShowCaseProgressBarComponent;
  let fixture: ComponentFixture<ShowCaseProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCaseProgressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCaseProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
