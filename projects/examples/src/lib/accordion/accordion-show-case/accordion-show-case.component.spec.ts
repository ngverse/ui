import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionShowCaseComponent } from './accordion-show-case.component';

describe('AccordionShowCaseComponent', () => {
  let component: AccordionShowCaseComponent;
  let fixture: ComponentFixture<AccordionShowCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionShowCaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccordionShowCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
