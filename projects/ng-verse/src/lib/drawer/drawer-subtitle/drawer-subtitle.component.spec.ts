import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerSubtitleComponent } from './drawer-subtitle.component';

describe('DrawerSubtitleComponent', () => {
  let component: DrawerSubtitleComponent;
  let fixture: ComponentFixture<DrawerSubtitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerSubtitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerSubtitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
