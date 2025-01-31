import {
  B,
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ListboxItemDirective } from './listbox-item.directive';
import { ListboxDirective } from './listbox.directive';

describe('ListboxDirective', () => {
  let fixture: ComponentFixture<ListboxTestComponent>;
  let component: ListboxTestComponent;
  let itemsEl: HTMLElement[];
  let listbox: ListboxDirective;
  let listboxEl: HTMLElement;

  function dispatchKeyEvent(key: string, keyCode: number) {
    const event = new KeyboardEvent('keydown', { key, keyCode });
    listboxEl.dispatchEvent(event);
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListboxTestComponent],
      providers: [provideExperimentalZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListboxTestComponent);
    component = fixture.componentInstance;
    itemsEl = fixture.debugElement
      .queryAll(By.directive(ListboxItemDirective))
      .map((item) => item.nativeElement);
    listbox = fixture.debugElement
      .query(By.directive(ListboxDirective))
      .injector.get(ListboxDirective);
    listboxEl = fixture.debugElement.query(
      By.directive(ListboxDirective)
    ).nativeElement;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should activate only first item if no value is provided', () => {
    const firstItem = itemsEl[0];
    const others = itemsEl.slice(1);
    expect(firstItem.tabIndex).toBe(0);
    expect(others.map((i) => i.tabIndex)).toEqual([-1, -1]);
  });

  it('should navigate vertically between items', async () => {
    component.orientation.set('vertical');
    await fixture.whenStable();

    const firstItem = itemsEl[0];
    const secondItem = itemsEl[1];
    const thirdItem = itemsEl[2];
    expect(firstItem.tabIndex).toBe(0);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(-1);
    dispatchKeyEvent('ArrowDown', DOWN_ARROW);
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(-1);
    expect(secondItem.tabIndex).toBe(0);
    expect(thirdItem.tabIndex).toBe(-1);
    dispatchKeyEvent('ArrowDown', DOWN_ARROW);
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(-1);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(0);

    dispatchKeyEvent('ArrowUp', UP_ARROW);
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(-1);
    expect(secondItem.tabIndex).toBe(0);
    expect(thirdItem.tabIndex).toBe(-1);

    dispatchKeyEvent('ArrowUp', UP_ARROW);
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(0);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(-1);
  });

  it('should horizontally navigate between items', async () => {
    component.orientation.set('horizontal');
    await fixture.whenStable();

    const firstItem = itemsEl[0];
    const secondItem = itemsEl[1];
    const thirdItem = itemsEl[2];
    expect(firstItem.tabIndex).toBe(0);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(-1);
    dispatchKeyEvent('ArrowRight', RIGHT_ARROW);
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(-1);
    expect(secondItem.tabIndex).toBe(0);
    expect(thirdItem.tabIndex).toBe(-1);
    dispatchKeyEvent('ArrowRight', RIGHT_ARROW);
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(-1);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(0);

    dispatchKeyEvent('ArrowLeft', LEFT_ARROW);
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(-1);
    expect(secondItem.tabIndex).toBe(0);
    expect(thirdItem.tabIndex).toBe(-1);

    dispatchKeyEvent('ArrowLeft', LEFT_ARROW);
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(0);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(-1);
  });

  it('should loop between items on withWrap', async () => {
    component.withWrap.set(true);

    await fixture.whenStable();

    const firstItem = itemsEl[0];
    const secondItem = itemsEl[1];
    const thirdItem = itemsEl[2];
    expect(firstItem.tabIndex).toBe(0);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(-1);
    dispatchKeyEvent('ArrowUp', UP_ARROW);
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(-1);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(0);
    dispatchKeyEvent('ArrowDown', DOWN_ARROW);
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(0);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(-1);
  });
  it('should activate item with TypeAhead', async () => {
    component.withTypeAhead.set(true);
    await fixture.whenStable();
    const firstItem = itemsEl[0];
    const thirdItem = itemsEl[2];
    expect(firstItem.tabIndex).toBe(0);
    dispatchKeyEvent('B', B);
    //Wait for 200ms because typeaHead by default emits after 200ms
    await new Promise<void>((resolve) => setTimeout(resolve, 200));
    await fixture.whenStable();
    await fixture.whenStable();
    expect(thirdItem.tabIndex).toBe(0);
  });
  it('focus method should focus first item or active one', async () => {
    const firstItem = itemsEl[0];
    listbox.focus();
    await fixture.whenStable();
    expect(document.activeElement).toBe(firstItem);
    dispatchKeyEvent('ArrowDown', DOWN_ARROW);
    await fixture.whenStable();
    const secondItem = itemsEl[1];
    expect(secondItem.tabIndex).toBe(0);
    listbox.focus();
    await fixture.whenStable();
    expect(document.activeElement).toBe(secondItem);
  });
  it('reset should set should reset tabState and set firstItem tabIndex=0', async () => {
    const firstItem = itemsEl[0];
    await fixture.whenStable();
    dispatchKeyEvent('ArrowDown', DOWN_ARROW);
    await fixture.whenStable();
    const secondItem = itemsEl[1];
    expect(secondItem.tabIndex).toBe(0);
    listbox.reset();
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(0);
    expect(secondItem.tabIndex).toBe(-1);
  });
  it('should activate the item based on value', async () => {
    component.value.set(2);
    await fixture.whenStable();
    const secondItem = itemsEl[1];
    await fixture.whenStable();
    expect(secondItem.tabIndex).toBe(0);
  });
  it('should activate first item if no value is provided', async () => {
    component.value.set(2);
    await fixture.whenStable();
    const secondItem = itemsEl[1];
    await fixture.whenStable();
    expect(secondItem.tabIndex).toBe(0);
    component.value.set(undefined);
    await fixture.whenStable();
    const firstItem = itemsEl[0];
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(0);
    component.value.set(null);
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(0);
    component.value.set('');
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(0);
  });
  it("should not activate item if value doesn't match", async () => {
    component.value.set(2);
    await fixture.whenStable();
    const secondItem = itemsEl[1];
    await fixture.whenStable();
    expect(secondItem.tabIndex).toBe(0);
    component.value.set(-100);
    await fixture.whenStable();
    const firstItem = itemsEl[0];
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(0);
  });
  it('should activate last item on multiple value', async () => {
    component.multiple.set(true);
    await fixture.whenStable();
    const firstItem = itemsEl[0];
    expect(firstItem.tabIndex).toBe(0);
    component.value.set([3]);
    await fixture.whenStable();
    const thirdItem = itemsEl[2];
    await fixture.whenStable();
    expect(thirdItem.tabIndex).toBe(0);
  });
  it('should activate first tab on empty array', async () => {
    component.multiple.set(true);
    await fixture.whenStable();
    const firstItem = itemsEl[0];
    expect(firstItem.tabIndex).toBe(0);
    component.value.set([]);
    await fixture.whenStable();
    expect(firstItem.tabIndex).toBe(0);
  });
  it('compareWith should work on single', async () => {
    const dummyCompareWith = (a: number) => a === 2;
    component.compareWith.set(dummyCompareWith);
    await fixture.whenStable();
    component.value.set(3);
    await fixture.whenStable();
    const thirdItem = itemsEl[2];
    await fixture.whenStable();
    expect(thirdItem.tabIndex).toBe(-1);
    const secondItem = itemsEl[1];
    expect(secondItem.tabIndex).toBe(0);
  });
  it('compare should work on multiple', async () => {
    component.multiple.set(true);
    await fixture.whenStable();
    const dummyCompareWith = (a: number) => a === 2;
    component.compareWith.set(dummyCompareWith);
    await fixture.whenStable();
    component.value.set([3]);
    await fixture.whenStable();
    const thirdItem = itemsEl[2];
    await fixture.whenStable();
    expect(thirdItem.tabIndex).toBe(-1);
    const secondItem = itemsEl[1];
    expect(secondItem.tabIndex).toBe(0);
  });
  it('should emit valueChange on click', () => {
    const valueChange = jasmine.createSpy('valueChange');
    listbox.itemSelected.subscribe(valueChange);
    const firstItem = itemsEl[0];
    firstItem.dispatchEvent(new Event('click'));
    expect(valueChange).toHaveBeenCalledWith(1);
  });
});

@Component({
  imports: [ListboxDirective, ListboxItemDirective],
  template: `
    <div
      [appListbox]="value()"
      [orientation]="orientation()"
      [withWrap]="withWrap()"
      [withTypeAhead]="withTypeAhead()"
      [multiple]="multiple()"
      [compareWith]="compareWith()"
    >
      <button [appListboxItem]="1">Mango</button>
      <button [appListboxItem]="2">Cherry</button>
      <button [appListboxItem]="3">Bannana</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListboxTestComponent {
  orientation = signal<'horizontal' | 'vertical'>('vertical');
  withWrap = signal(false);
  withTypeAhead = signal(false);
  value = signal<unknown>(undefined);
  multiple = signal(false);
  compareWith = signal((o1: number, o2: number) => o1 === o2);
}
