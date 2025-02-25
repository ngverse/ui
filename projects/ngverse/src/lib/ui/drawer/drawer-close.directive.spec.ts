import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
  signal,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { DrawerCloseDirective } from './drawer-close.directive';
import { DrawerService } from './drawer.service';

describe('DrawerCloseDirective', () => {
  let fixture: ComponentFixture<DrawerCloseRootTestComponent>;
  let service: DrawerService;
  let document: Document;

  function getDrawerCloseElement() {
    return document.querySelector('button') as HTMLElement;
  }

  function getDrawerTestElement() {
    return document.querySelector('app-drawer-test') as HTMLElement;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DrawerCloseDirective, DrawerCloseTestComponent],
      providers: [
        provideNoopAnimations(),
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();
    document = TestBed.inject(DOCUMENT);
    service = TestBed.inject(DrawerService);
    fixture = TestBed.createComponent(DrawerCloseRootTestComponent);
  });

  it('should close the drawer on DrawerCloseDirective click', async () => {
    const drawerRef = service.open(DrawerCloseTestComponent);
    await fixture.whenStable();
    expect(getDrawerTestElement()).toBeTruthy();
    getDrawerCloseElement().dispatchEvent(new Event('click'));
    await fixture.whenStable();
    drawerRef.closed.subscribe((value) => {
      expect(value).toBe('test');
    });
    expect(getDrawerTestElement()).toBeFalsy();
  });
});

@Component({
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerCloseRootTestComponent {}

@Component({
  selector: 'app-drawer-test',
  imports: [DrawerCloseDirective],
  template: `<div>
    Drawer test {{ data }} <button [appDrawerClose]="value()">Close</button>
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class DrawerCloseTestComponent {
  value = signal('test');
}
