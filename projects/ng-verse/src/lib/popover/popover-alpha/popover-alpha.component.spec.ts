import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideAnimations } from '@angular/platform-browser/animations';
import { PopoverAlphaComponent } from './popover-alpha.component';

describe('PopoverAlphaComponent', () => {
  let component: PopoverAlphaComponent;
  let fixture: ComponentFixture<PopoverAlphaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopoverAlphaComponent],
      providers: [provideAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverAlphaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
