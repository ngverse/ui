import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipMessageContainerComponent } from './tooltip-message-container.component';

describe('TooltipMessageContainerComponent', () => {
  let component: TooltipMessageContainerComponent;
  let fixture: ComponentFixture<TooltipMessageContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipMessageContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TooltipMessageContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
