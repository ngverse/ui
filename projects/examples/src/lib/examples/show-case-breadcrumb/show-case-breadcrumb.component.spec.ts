import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCaseBreadcrumbComponent } from './show-case-breadcrumb.component';

describe('ShowCaseBreadcrumbComponent', () => {
  let component: ShowCaseBreadcrumbComponent;
  let fixture: ComponentFixture<ShowCaseBreadcrumbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCaseBreadcrumbComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCaseBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
