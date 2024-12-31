import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultiSelectState } from './multi-select.state';
import { MultiSelectItemComponent } from './multi-select-item/multi-select-item.component';

function createMultiselectComponent(value: string) {
  const fixture = TestBed.createComponent(MultiSelectItemComponent);
  const component = fixture.componentInstance;
  fixture.componentRef.setInput('value', value);
  fixture.detectChanges();
  return { component, fixture };
}

describe('MultiSelectState', () => {
  let service: MultiSelectState;
  let item1: { component: MultiSelectItemComponent; fixture: ComponentFixture<MultiSelectItemComponent> };
  let item2: { component: MultiSelectItemComponent; fixture: ComponentFixture<MultiSelectItemComponent> };
  let mockOnChange: jasmine.Spy;
  let mockOnTouched: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MultiSelectState, MultiSelectItemComponent],
    });

    service = TestBed.inject(MultiSelectState);

    item1 = createMultiselectComponent('value1');
    item2 = createMultiselectComponent('value2');

    mockOnChange = jasmine.createSpy('onChange');
    mockOnTouched = jasmine.createSpy('onTouched');

    service._onChange = mockOnChange;
    service._onTouched = mockOnTouched;
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });

  it('should toggle an item in the selection model', () => {
    service.add(item1.component);

    service.toggle(item1.component);
    expect(item1.component.selected()).toBeTrue();

    service.toggle(item1.component);
    expect(item1.component.selected()).toBeFalse();
  });

  it('should call _onChange and _onTouched when toggle selections', () => {
    service.add(item1.component);
    service.toggle(item1.component);
    expect(mockOnChange).toHaveBeenCalledWith(['value1']);
    expect(mockOnTouched).toHaveBeenCalled();
  });

  it('should add a component to the components map', () => {
    service.add(item1.component);

    expect(service.hasSelectedValues()).toBe(false);

    item1.component.selected.set(true);
    expect(item1.component.selected()).toBeTrue();
  });

  it('should remove a component and deselect if selected', () => {
    service.add(item1.component);
    service.toggle(item1.component);

    service.remove(item1.component);
    expect(service.hasSelectedValues()).toBe(false);
    expect(mockOnChange).toHaveBeenCalledWith([]);
    expect(mockOnTouched).toHaveBeenCalled();
  });

  it('should set selection and mark items as selected', () => {
    service.add(item1.component);
    service.add(item2.component);

    service.setSelection('value1', 'value2');

    expect(item1.component.selected()).toBeTrue();
    expect(item1.component.selected()).toBeTrue();
  });

  it('should clear all selections', () => {
    service.add(item1.component);
    service.add(item2.component);
    service.setSelection('value1', 'value2');

    service.clear();

    expect(item1.component.selected()).toBeFalse();
    expect(item2.component.selected()).toBeFalse();
  });
});
