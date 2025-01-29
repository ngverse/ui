import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListboxItemDirective } from './listbox-item.directive';
import { ListboxRegistry } from './listbox-registry';

describe('ListboxItemDirective', () => {
  let fixture: ComponentFixture<ListboxItemTestComponent>;
  let directive: ListboxItemDirective;
  let directiveEl: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListboxItemTestComponent],
      providers: [
        ListboxRegistry,
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ListboxItemTestComponent);

    directive = fixture.debugElement
      .query(By.directive(ListboxItemDirective))
      .injector.get(ListboxItemDirective);
    directiveEl = fixture.debugElement.query(
      By.directive(ListboxItemDirective)
    ).nativeElement;
    await fixture.whenStable();
  });

  it('should create an instance', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
  it('getLabel should return textContent', () => {
    expect(directive.getLabel()).toEqual('I am listbox item');
  });
  it('should add itself to registry', () => {
    expect(TestBed.inject(ListboxRegistry).items().length).toBe(1);
  });
  it('should set tabIndex=-1 by default', () => {
    expect(directiveEl.tabIndex).toBe(-1);
  });
  it('should set tabIndex=0 on activate', async () => {
    directive.activate();
    await fixture.whenStable();
    expect(directiveEl.tabIndex).toBe(0);
  });
  it('should focus itself on activate', async () => {
    directive.activate(true);
    await fixture.whenStable();
    expect(document.activeElement).toBe(directiveEl);
  });
  it('should remove from registry on destroy', () => {
    fixture.destroy();
    expect(TestBed.inject(ListboxRegistry).items().length).toBe(0);
  });
  it('should emit clicked event on click', () => {
    const clicked = jasmine.createSpy('clicked');
    directive.clicked.subscribe(clicked);
    directiveEl.dispatchEvent(new Event('click'));
    expect(clicked).toHaveBeenCalled();
  });
});

@Component({
  imports: [ListboxItemDirective],
  template: ` <button appListboxItem>I am listbox item</button> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListboxItemTestComponent {}
