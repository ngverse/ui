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
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { IconLoaderService } from './icon-loader.service';
import { IconRegistry } from './icon.registry';

const TEST_ICON = `<svg
  xmlns="http://www.w3.org/2000/svg"
  width="20"
  height="20"
  viewBox="0 0 448 512"
>
  <path
    fill="currentColor"
    d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
  />
</svg>
`
  .replace(/\s+/g, ' ')
  .trim();

const TEST_URL = '/test.svg';

const TEST_NAME = 'test';

describe('IconLoaderService', () => {
  let service: IconLoaderService;
  let registryService: IconRegistry;
  let httpMock: HttpTestingController;
  let fixture: ComponentFixture<TestIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestIconComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        IconLoaderService,
        IconRegistry,
        provideExperimentalZonelessChangeDetection(),
      ],
    }).compileComponents();

    service = TestBed.inject(IconLoaderService);
    registryService = TestBed.inject(IconRegistry);
    httpMock = TestBed.inject(HttpTestingController);
    registryService.addIcon(TEST_NAME, TEST_URL);
    fixture = TestBed.createComponent(TestIconComponent);
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should throw error on invalid name', () => {
    expect(() => {
      firstValueFrom(service.load('unknown-icon'));
    }).toThrow();
  });
  it('should return null on invalid svg', async () => {
    registryService.addIcon('invalid', 'test-invalid-svg');

    const request = firstValueFrom(service.load('invalid'));
    const testRequest = httpMock.expectOne('test-invalid-svg');
    testRequest.flush('wrong svg');
    expect(await request).toBeNull();
  });
  it('should load icon by name', async () => {
    firstValueFrom(service.load(TEST_NAME));
    const testRequest = httpMock.expectOne(TEST_URL);
    expect(testRequest.request.method).toBe('GET');
  });
  it('should send only 1 request for  same subsequent calls', () => {
    firstValueFrom(service.load(TEST_NAME));
    firstValueFrom(service.load(TEST_NAME));
    const testRequest = httpMock.expectOne(TEST_URL);
    testRequest.flush(TEST_ICON);
    expect(testRequest.request.method).toBe('GET');
  });
  it('should return cloned nodes on subsequent calls', async () => {
    const firstRequest = firstValueFrom(service.load(TEST_NAME));
    const secondRequest = firstValueFrom(service.load(TEST_NAME));
    const testRequest = httpMock.expectOne(TEST_URL);
    testRequest.flush(TEST_ICON);
    expect(await firstRequest).not.toBe(await secondRequest);
  });
  it('should return cached request after first load', async () => {
    firstValueFrom(service.load(TEST_NAME));
    await fixture.whenStable();
    firstValueFrom(service.load(TEST_NAME));
    const testRequest = httpMock.expectOne(TEST_URL);
    testRequest.flush(TEST_ICON);
    expect(testRequest.request.method).toBe('GET');
  });
  it('should return cloned nodes on cached calls', async () => {
    const firstRequest = firstValueFrom(service.load(TEST_NAME));
    await fixture.whenStable();
    const secondRequest = firstValueFrom(service.load(TEST_NAME));
    const testRequest = httpMock.expectOne(TEST_URL);
    testRequest.flush(TEST_ICON);
    await fixture.whenStable();
    expect(await firstRequest).not.toBe(await secondRequest);
  });
});

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>Test</p>`,
})
export class TestIconComponent {}
