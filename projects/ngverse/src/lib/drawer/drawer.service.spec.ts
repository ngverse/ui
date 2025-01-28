import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
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
      providers: [provideNoopAnimations()],
    }).compileComponents();
    service = TestBed.inject(DrawerService);
    fixture = TestBed.createComponent(DrawerRootTestComponent);
    fixture.detectChanges();
    document = TestBed.inject(DOCUMENT);
  });

  it('should be created', () => {
    expect(TestBed.inject(DrawerService)).toBe(service);
  });
  it('should open the drawer', () => {
    service.open(DrawerTestComponent);
    fixture.detectChanges();
    expect(getDrawerElement()).toBeTruthy();
  });
  it("should render the drawer's content", () => {
    service.open(DrawerTestComponent);
    fixture.detectChanges();
    expect(getDrawerTestComponent().textContent).toContain('Drawer test');
  });
  it('should close the drawer on backdrop click', fakeAsync(() => {
    service.open(DrawerTestComponent);
    fixture.detectChanges();
    getBackdropElement().dispatchEvent(new Event('click'));
    tick(0);
    fixture.detectChanges();
    expect(getDrawerElement()).toBeFalsy();
  }));
  it('should close backdrop on ESCAPE key', fakeAsync(() => {
    service.open(DrawerTestComponent);
    fixture.detectChanges();
    document.body.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape' })
    );
    tick(0);
    fixture.detectChanges();
    expect(getDrawerElement()).toBeFalsy();
  }));
  it('should close drawer on DrawerRef close method', fakeAsync(() => {
    const ref = service.open(DrawerTestComponent);
    fixture.detectChanges();
    ref.close();
    tick(0);
    fixture.detectChanges();
    expect(getDrawerElement()).toBeFalsy();
  }));
  it('should emit closed event on DrawerRef close method', fakeAsync(() => {
    const ref = service.open(DrawerTestComponent);
    fixture.detectChanges();
    ref.closed.subscribe(() => {
      expect(true).toBeTrue();
    });
    ref.close();
    tick(0);
    fixture.detectChanges();
  }));
  it('should pass the value to DrawerRef close method', fakeAsync(() => {
    const ref = service.open(DrawerTestComponent);
    fixture.detectChanges();
    ref.closed.subscribe((value) => {
      expect(value).toBe('value');
    });
    ref.close('value');
    tick(0);
    fixture.detectChanges();
  }));
  it('should bass the data to DrawerTestComponent', () => {
    service.open(DrawerTestComponent, {
      data: 'John Doe',
    });
    fixture.detectChanges();
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
