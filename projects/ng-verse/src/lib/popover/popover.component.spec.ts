import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopoverNewComponent } from './popover.component';

describe('PopoverNewComponent', () => {
  let component: PopoverNewComponent;
  let fixture: ComponentFixture<PopoverNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopoverNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
