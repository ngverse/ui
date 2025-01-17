import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { IconLoaderService } from './icon-loader.service';
import { IconRegistryService } from './icon-registry.service';

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
      expect(() => service.load('nonExistingIcon')).toThrowError(
        'Icon with name nonExistingIcon not found. Please use IconRegistryService.addSvgIcon() to add it.'
      );
    });
    it("should return the icon if it's registered", () => {
      registryService.addIcon('existingIcon', 'assets/icons/existing-icon.svg');

      service.load('existingIcon').subscribe((icon) => {
        expect(icon).toBeTruthy();
      });
      httpMock
        .expectOne('assets/icons/existing-icon.svg')
        .flush('<svg> Test icon </svg>');
    });
  });
});
