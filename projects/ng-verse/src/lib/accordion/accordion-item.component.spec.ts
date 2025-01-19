import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionItemComponent } from './accordion-item.component';
import { AccordionState } from './accordion.state';

describe('AccordionItemComponent', () => {
  let component: AccordionItemComponent;
  let fixture: ComponentFixture<AccordionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule],
      providers: [AccordionState],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle open state when header button is clicked', () => {
    const headerButton = fixture.debugElement.query(
      By.css('.accordion-item-header')
    );
    headerButton.nativeElement.click();
    expect(component.isOpen()).toBeTrue();

    headerButton.nativeElement.click();
    expect(component.isOpen()).toBeFalse();
  });

  it('should apply aria-expanded based on open state', () => {
    const headerButton = fixture.debugElement.query(
      By.css('.accordion-item-header')
    );
    headerButton.nativeElement.click();
    fixture.detectChanges();
    expect(headerButton.attributes['aria-expanded']).toBe('true');

    headerButton.nativeElement.click();
    fixture.detectChanges();
    expect(headerButton.attributes['aria-expanded']).toBe('false');
  });

  it('should disable the header button when disabled() returns true', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const headerButton = fixture.debugElement.query(
      By.css('.accordion-item-header')
    );
    expect(headerButton.nativeElement.disabled).toBeTrue();
  });

  it('should render content when open', () => {
    component.toggle();
    fixture.detectChanges();
    const bodyContent = fixture.debugElement.query(
      By.css('.accordion-item-body')
    );
    expect(bodyContent).toBeTruthy();
  });
  it('should display label when label is passed', () => {
    fixture.componentRef.setInput('label', 'test');
    fixture.detectChanges();
    const headerButton = fixture.debugElement.query(
      By.css('.accordion-item-header')
    );
    expect(headerButton.nativeElement.textContent.trim()).toBe('test');
  });
});
