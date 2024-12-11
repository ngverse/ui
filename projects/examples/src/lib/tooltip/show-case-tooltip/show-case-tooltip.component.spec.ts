import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCaseTooltipComponent } from './show-case-tooltip.component';

describe('ShowCaseTooltipComponent', () => {
  let component: ShowCaseTooltipComponent;
  let fixture: ComponentFixture<ShowCaseTooltipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCaseTooltipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCaseTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
