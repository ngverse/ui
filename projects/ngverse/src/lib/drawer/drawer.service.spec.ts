import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DRAWER_DATA } from './drawer-ref';
import { DrawerService } from './drawer.service';

describe('DrawerService', () => {
  let fixture: ComponentFixture<DrawerRootTestComponent>;
  let service: DrawerService;
  let document: Document;

  function getDrawerElement() {
    return document.querySelector('app-drawer') as HTMLElement;
  }

  function getDrawerTestComponent() {
    return getDrawerElement().querySelector('app-drawer-test') as HTMLElement;
  }

  function getBackdropElement() {
    return document.querySelector('.cdk-overlay-backdrop') as HTMLElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();
    service = TestBed.inject(DrawerService);
    fixture = TestBed.createComponent(DrawerRootTestComponent);
    document = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(TestBed.inject(DrawerService)).toBe(service);
  });
  it('should open the drawer', () => {
    service.open(DrawerTestComponent);
    expect(getDrawerElement()).toBeTruthy();
  });
  it("should render the drawer's content", async () => {
    service.open(DrawerTestComponent);
    await fixture.whenStable();
    expect(getDrawerTestComponent().textContent).toContain('Drawer test');
  });
  it('should close the drawer on backdrop click', async () => {
    service.open(DrawerTestComponent);
    await fixture.whenStable();
    getBackdropElement().dispatchEvent(new Event('click'));
    await fixture.whenStable();
    await fixture.whenStable();
    expect(getDrawerElement()).toBeFalsy();
  });
  it('should close backdrop on ESCAPE key', async () => {
    service.open(DrawerTestComponent);
    await fixture.whenStable();
    document.body.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape' })
    );
    await fixture.whenStable();
    await fixture.whenStable();
    expect(getDrawerElement()).toBeFalsy();
  });
  it('should close drawer on DrawerRef close method', async () => {
    const ref = service.open(DrawerTestComponent);
    await fixture.whenStable();
    ref.close();
    await fixture.whenStable();
    await fixture.whenStable();
    expect(getDrawerElement()).toBeFalsy();
  });
  it('should emit closed event on DrawerRef close method', async () => {
    const ref = service.open(DrawerTestComponent);
    await fixture.whenStable();
    ref.closed.subscribe(() => {
      expect(true).toBeTrue();
    });
    ref.close();
    await fixture.whenStable();
    await fixture.whenStable();
  });
  it('should pass the value to DrawerRef close method', async () => {
    const ref = service.open(DrawerTestComponent);
    await fixture.whenStable();
    ref.closed.subscribe((value) => {
      expect(value).toBe('value');
    });
    ref.close('value');
    await fixture.whenStable();
    await fixture.whenStable();
  });
  it('should bass the data to DrawerTestComponent', async () => {
    service.open(DrawerTestComponent, {
      data: 'John Doe',
    });
    await fixture.whenStable();
    expect(getDrawerTestComponent().textContent).toContain('John Doe');
  });
});

@Component({
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerRootTestComponent {}

@Component({
  selector: 'app-drawer-test',
  template: `<div>Drawer test {{ data }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DrawerTestComponent {
  data = inject(DRAWER_DATA);
}
