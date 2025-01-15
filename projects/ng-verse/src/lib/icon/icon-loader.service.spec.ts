import { IconLoaderService } from './icon-loader.service';
import { IconRegistryService } from './icon-registry.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

describe('IconLoaderService', () => {
  let service: IconLoaderService;
  let registryService: IconRegistryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        IconLoaderService,
        IconRegistryService,
      ],
    });

    service = TestBed.inject(IconLoaderService);
    registryService = TestBed.inject(IconRegistryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadSvg', () => {
    it('should throw an error if the icon is not registered', () => {
      expect(() => service.loadSvg('nonExistingIcon')).toThrowError(
        'Icon with name nonExistingIcon not found. Please use IconRegistryService.addSvgIcon() to add it.'
      );
    });

    it('should return cached SVG if it exists', (done) => {
      const iconName = 'testIcon';
      const iconUrl = 'assets/icons/test-icon.svg';
      const svgContent = '<svg></svg>';

      registryService.addSvgIcon(iconName, iconUrl);
      service['iconsByUrl'].set(iconName, svgContent);

      service.loadSvg(iconName).subscribe((svg) => {
        expect(svg).toBe(svgContent);
        done();
      });
    });

    it('should return a loading Observable if the SVG is already loading', (done) => {
      const iconName = 'loadingIcon';
      const iconUrl = 'assets/icons/loading-icon.svg';
      const svgContent = '<svg>loading</svg>';

      registryService.addSvgIcon(iconName, iconUrl);
      const loadingObservable = service.loadSvg(iconName);

      loadingObservable.subscribe((svg) => {
        expect(svg).toBe(svgContent);
        done();
      });

      const req = httpMock.expectOne(iconUrl);
      req.flush(svgContent);
    });

    it('should load and cache the SVG if not already loaded', (done) => {
      const iconName = 'newIcon';
      const iconUrl = 'assets/icons/new-icon.svg';
      const svgContent = '<svg>new</svg>';

      registryService.addSvgIcon(iconName, iconUrl);

      service.loadSvg(iconName).subscribe((svg) => {
        expect(svg).toBe(svgContent);
        expect(service['iconsByUrl'].get(iconName)).toBe(svgContent);
        done();
      });

      const req = httpMock.expectOne(iconUrl);
      expect(req.request.method).toBe('GET');
      req.flush(svgContent);
    });

    it('should not cache the SVG if cache option is disabled', (done) => {
      const iconName = 'noCacheIcon';
      const iconUrl = 'assets/icons/no-cache-icon.svg';
      const svgContent = '<svg>no-cache</svg>';

      registryService.addSvgIcon(iconName, iconUrl, { cache: false });

      service.loadSvg(iconName).subscribe((svg) => {
        expect(svg).toBe(svgContent);
        expect(service['iconsByUrl'].has(iconName)).toBeFalse();
        done();
      });

      const req = httpMock.expectOne(iconUrl);
      expect(req.request.method).toBe('GET');
      req.flush(svgContent);
    });
  });
});
