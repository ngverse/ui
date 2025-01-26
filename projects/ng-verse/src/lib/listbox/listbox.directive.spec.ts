import {
  B,
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  UP_ARROW,
} from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
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
    }).compileComponents();

    fixture = TestBed.createComponent(ListboxTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    itemsEl = fixture.debugElement
      .queryAll(By.directive(ListboxItemDirective))
      .map((item) => item.nativeElement);
    listbox = fixture.debugElement
      .query(By.directive(ListboxDirective))
      .injector.get(ListboxDirective);
    listboxEl = fixture.debugElement.query(
      By.directive(ListboxDirective)
    ).nativeElement;
    fixture.detectChanges();
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

  it('should navigate vertically between items', () => {
    component.orientation.set('vertical');
    fixture.detectChanges();

    const firstItem = itemsEl[0];
    const secondItem = itemsEl[1];
    const thirdItem = itemsEl[2];
    expect(firstItem.tabIndex).toBe(0);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(-1);
    dispatchKeyEvent('ArrowDown', DOWN_ARROW);
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(-1);
    expect(secondItem.tabIndex).toBe(0);
    expect(thirdItem.tabIndex).toBe(-1);
    dispatchKeyEvent('ArrowDown', DOWN_ARROW);
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(-1);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(0);

    dispatchKeyEvent('ArrowUp', UP_ARROW);
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(-1);
    expect(secondItem.tabIndex).toBe(0);
    expect(thirdItem.tabIndex).toBe(-1);

    dispatchKeyEvent('ArrowUp', UP_ARROW);
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(0);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(-1);
  });

  it('should horizontally navigate between items', () => {
    component.orientation.set('horizontal');
    fixture.detectChanges();

    const firstItem = itemsEl[0];
    const secondItem = itemsEl[1];
    const thirdItem = itemsEl[2];
    expect(firstItem.tabIndex).toBe(0);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(-1);
    dispatchKeyEvent('ArrowRight', RIGHT_ARROW);
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(-1);
    expect(secondItem.tabIndex).toBe(0);
    expect(thirdItem.tabIndex).toBe(-1);
    dispatchKeyEvent('ArrowRight', RIGHT_ARROW);
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(-1);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(0);

    dispatchKeyEvent('ArrowLeft', LEFT_ARROW);
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(-1);
    expect(secondItem.tabIndex).toBe(0);
    expect(thirdItem.tabIndex).toBe(-1);

    dispatchKeyEvent('ArrowLeft', LEFT_ARROW);
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(0);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(-1);
  });

  it('should loop between items on withWrap', () => {
    component.withWrap.set(true);

    fixture.detectChanges();

    const firstItem = itemsEl[0];
    const secondItem = itemsEl[1];
    const thirdItem = itemsEl[2];
    expect(firstItem.tabIndex).toBe(0);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(-1);
    dispatchKeyEvent('ArrowUp', UP_ARROW);
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(-1);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(0);
    dispatchKeyEvent('ArrowDown', DOWN_ARROW);
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(0);
    expect(secondItem.tabIndex).toBe(-1);
    expect(thirdItem.tabIndex).toBe(-1);
  });
  it('should activate item with TypeAhead', fakeAsync(() => {
    component.withTypeAhead.set(true);
    fixture.detectChanges();
    const firstItem = itemsEl[0];
    const thirdItem = itemsEl[2];
    expect(firstItem.tabIndex).toBe(0);
    dispatchKeyEvent('B', B);
    //Wait for 200ms because typeaHead by default emits after 200ms
    tick(200);
    fixture.detectChanges();
    expect(thirdItem.tabIndex).toBe(0);
  }));
  it('focus method should focus first item or active one', () => {
    const firstItem = itemsEl[0];
    listbox.focus();
    fixture.detectChanges();
    expect(document.activeElement).toBe(firstItem);
    dispatchKeyEvent('ArrowDown', DOWN_ARROW);
    fixture.detectChanges();
    const secondItem = itemsEl[1];
    expect(secondItem.tabIndex).toBe(0);
    listbox.focus();
    fixture.detectChanges();
    expect(document.activeElement).toBe(secondItem);
  });
  it('reset should set should reset tabState and set firstItem tabIndex=0', () => {
    const firstItem = itemsEl[0];
    fixture.detectChanges();
    dispatchKeyEvent('ArrowDown', DOWN_ARROW);
    fixture.detectChanges();
    const secondItem = itemsEl[1];
    expect(secondItem.tabIndex).toBe(0);
    listbox.reset();
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(0);
    expect(secondItem.tabIndex).toBe(-1);
  });
  it('should activate the item based on value', fakeAsync(() => {
    component.value.set(2);
    fixture.detectChanges();
    const secondItem = itemsEl[1];
    fixture.detectChanges();
    expect(secondItem.tabIndex).toBe(0);
  }));
  it('should activate first item if no value is provided', () => {
    component.value.set(2);
    fixture.detectChanges();
    const secondItem = itemsEl[1];
    fixture.detectChanges();
    expect(secondItem.tabIndex).toBe(0);
    component.value.set(undefined);
    fixture.detectChanges();
    const firstItem = itemsEl[0];
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(0);
    component.value.set(null);
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(0);
    component.value.set('');
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(0);
  });
  it("should not activate item if value doesn't match", fakeAsync(() => {
    component.value.set(2);
    fixture.detectChanges();
    const secondItem = itemsEl[1];
    fixture.detectChanges();
    expect(secondItem.tabIndex).toBe(0);
    component.value.set(-100);
    fixture.detectChanges();
    const firstItem = itemsEl[0];
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(0);
  }));
  it('should activate last item on multiple value', () => {
    component.multiple.set(true);
    fixture.detectChanges();
    const firstItem = itemsEl[0];
    expect(firstItem.tabIndex).toBe(0);
    component.value.set([3]);
    fixture.detectChanges();
    const thirdItem = itemsEl[2];
    fixture.detectChanges();
    expect(thirdItem.tabIndex).toBe(0);
  });
  it('should activate first tab on empty array', () => {
    component.multiple.set(true);
    fixture.detectChanges();
    const firstItem = itemsEl[0];
    expect(firstItem.tabIndex).toBe(0);
    component.value.set([]);
    fixture.detectChanges();
    expect(firstItem.tabIndex).toBe(0);
  });
  it('compareWith should work on single', () => {
    const dummyCompareWith = (a: number) => a === 2;
    component.compareWith.set(dummyCompareWith);
    fixture.detectChanges();
    component.value.set(3);
    fixture.detectChanges();
    const thirdItem = itemsEl[2];
    fixture.detectChanges();
    expect(thirdItem.tabIndex).toBe(-1);
    const secondItem = itemsEl[1];
    expect(secondItem.tabIndex).toBe(0);
  });
  it('compare should work on multiple', () => {
    component.multiple.set(true);
    fixture.detectChanges();
    const dummyCompareWith = (a: number) => a === 2;
    component.compareWith.set(dummyCompareWith);
    fixture.detectChanges();
    component.value.set([3]);
    fixture.detectChanges();
    const thirdItem = itemsEl[2];
    fixture.detectChanges();
    expect(thirdItem.tabIndex).toBe(-1);
    const secondItem = itemsEl[1];
    expect(secondItem.tabIndex).toBe(0);
  });
  it('should emit valueChange on click', () => {
    const valueChange = jasmine.createSpy('valueChange');
    listbox.valueChange.subscribe(valueChange);
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
