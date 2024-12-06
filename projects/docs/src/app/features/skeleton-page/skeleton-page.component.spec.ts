import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonPageComponent } from './skeleton-page.component';

describe('SkeletonPageComponent', () => {
  let component: SkeletonPageComponent;
  let fixture: ComponentFixture<SkeletonPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkeletonPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkeletonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
