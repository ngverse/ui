import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DrawerRef } from './drawer-ref';
import { DrawerComponent } from './drawer.component';

describe('DrawerComponent', () => {
  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerComponent],
      providers: [
        provideNoopAnimations(),
        {
          provide: DrawerRef,
          useValue: {},
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display title', () => {
    component.title.set('Title');
    fixture.detectChanges();
    expect(
      fixture.nativeElement
        .querySelector('.drawer-header h1')
        .textContent.trim()
    ).toBe('Title');
  });
  it('should display component', () => {
    component.component = DrawerTestComponent;
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('I am component');
  });
});

@Component({
  template: ` <div>I am component</div> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerTestComponent {}
