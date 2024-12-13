import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCaseAccordionComponent } from './show-case-accordion.component';

describe('ShowCaseAccordionComponent', () => {
  let component: ShowCaseAccordionComponent;
  let fixture: ComponentFixture<ShowCaseAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowCaseAccordionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCaseAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
