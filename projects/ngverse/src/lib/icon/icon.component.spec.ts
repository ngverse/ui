import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  ChangeDetectionStrategy,
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { IconLoaderService } from './icon-loader.service';
import { IconComponent } from './icon.component';
import { IconRegistry } from './icon.registry';

describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;
  let registryService: IconRegistry;
  let httpMock: HttpTestingController;
  let iconElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        IconLoaderService,
        IconRegistry,
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();

    registryService = TestBed.inject(IconRegistry);
    httpMock = TestBed.inject(HttpTestingController);

    registryService.addIcon('test', 'assets/icons/test-icon.svg');
    fixture = TestBed.createComponent(IconComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('name', 'test');
    iconElement = fixture.nativeElement;
    await fixture.whenStable();
  });

  function flushIcon() {
    const content = '<svg>test</svg>';
    const req = httpMock.expectOne('assets/icons/test-icon.svg');
    req.flush(content);
  }

  function svgEl() {
    return iconElement.children[0];
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display icon', () => {
    flushIcon();
    expect(iconElement.children[0].tagName).toBe('svg');
  });
  it('should be 24px height and width by default', async () => {
    flushIcon();
    await fixture.whenStable();
    expect(svgEl().getAttribute('width')).toBe('24px');
    expect(svgEl().getAttribute('height')).toBe('24px');
  });
  it('should set the width and height', async () => {
    flushIcon();
    fixture.componentRef.setInput('width', 32);
    fixture.componentRef.setInput('height', 48);
    await fixture.whenStable();
    expect(svgEl().getAttribute('width')).toBe('32px');
    expect(svgEl().getAttribute('height')).toBe('48px');
  });
  it('should set string sizes', async () => {
    flushIcon();
    fixture.componentRef.setInput('width', '50%');
    fixture.componentRef.setInput('height', '70%');
    await fixture.whenStable();
    expect(svgEl().getAttribute('width')).toBe('50%');
    expect(svgEl().getAttribute('height')).toBe('70%');
  });
  it('if stretch [true] it should set 100% to sizes', async () => {
    flushIcon();
    fixture.componentRef.setInput('stretch', true);
    await fixture.whenStable();
    expect(svgEl().getAttribute('width')).toBe('100%');
    expect(svgEl().getAttribute('height')).toBe('100%');
  });

  it('should keep only one icon if name changes', async () => {
    flushIcon();
    fixture.componentRef.setInput('name', 'test');
    await fixture.whenStable();
    expect(iconElement.children.length).toBe(1);
    registryService.addIcon('another-icon', 'assets/icons/another-icon.svg');
    const content = '<svg>Another Icon</svg>';
    fixture.componentRef.setInput('name', 'another-icon');
    await fixture.whenStable();
    const req = httpMock.expectOne('assets/icons/another-icon.svg');
    req.flush(content);
    await fixture.whenStable();
    expect(iconElement.children.length).toBe(1);
  });
});

@Component({
  selector: 'app-test-icon',
  template: ` <app-icon [name]="'test'"></app-icon>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [IconComponent],
})
export class TestIconComponent {}
