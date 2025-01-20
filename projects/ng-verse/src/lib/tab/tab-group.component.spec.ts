import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { TabGroupComponent } from './tab-group.component';
import { TabComponent } from './tab.component';

@Component({
  selector: 'app-test-tab-group',
  imports: [TabGroupComponent, TabComponent],
  template: `
    <app-tab-group [selectedIndex]="selectedIndex()">
      <app-tab label="Tab header 1">
        <h1>Tab Content 1</h1>
      </app-tab>
      <app-tab label="Tab header 2">
        <h1>Tab Content 2</h1>
      </app-tab>
    </app-tab-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestTabGroupComponent {
  selectedIndex = signal(1);
}

describe('SelectComponent', () => {
  let component: TestTabGroupComponent;
  let fixture: ComponentFixture<TestTabGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestTabGroupComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestTabGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two tabs', () => {
    const tabHeaders = fixture.nativeElement.querySelectorAll('app-tab');
    expect(tabHeaders.length).toBe(2);
  });

  it('should select the second tab by default', () => {
    const selectedTab =
      fixture.nativeElement.querySelector('.tab-header.active');
    expect(selectedTab.textContent.trim()).toBe('Tab header 2');
  });

  it('should render tab headers', () => {
    expect(
      fixture.nativeElement.querySelector('.tab-group-header')
    ).toBeDefined();
  });

  it('should switch to the first tab when clicked', () => {
    const firstTabHeader =
      fixture.nativeElement.querySelectorAll('.tab-header')[0];
    firstTabHeader.click();
    fixture.detectChanges();
    const selectedTab =
      fixture.nativeElement.querySelector('.tab-header.active');
    expect(selectedTab.textContent.trim()).toBe('Tab header 1');
  });

  it('should render the correct tab content', () => {
    const tabContent = fixture.nativeElement.querySelector('.tab-body');
    expect(tabContent.textContent.trim()).toContain('Tab Content 2');
  });

  it('should change active tab when selectedIndex changes', () => {
    component.selectedIndex.set(0);
    fixture.detectChanges();
    const selectedTab =
      fixture.nativeElement.querySelector('.tab-header.active');
    expect(selectedTab.textContent.trim()).toBe('Tab header 1');
  });
});
