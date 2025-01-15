import { IconOptions, IconRegistryService } from './icon-registry.service';
import { TestBed } from '@angular/core/testing';

describe('IconRegistryService', () => {
  let service: IconRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addSvgIcon', () => {
    it('should add an icon with default options', () => {
      const iconName = 'testIcon';
      const url = 'assets/icons/test-icon.svg';

      service.addSvgIcon(iconName, url);
      const icon = service.getSvgIcon(iconName);

      expect(icon).toBeTruthy();
      expect(icon?.url).toBe(url);
      expect(icon?.options).toEqual({ cache: true });
    });

    it('should add an icon with overridden options', () => {
      const iconName = 'testIconWithOptions';
      const url = 'assets/icons/test-icon-with-options.svg';
      const options: IconOptions = { cache: false };

      service.addSvgIcon(iconName, url, options);
      const icon = service.getSvgIcon(iconName);

      expect(icon).toBeTruthy();
      expect(icon?.url).toBe(url);
      expect(icon?.options).toEqual({ cache: false });
    });
  });

  describe('getSvgIcon', () => {
    it('should return the correct icon when it exists', () => {
      const iconName = 'existingIcon';
      const url = 'assets/icons/existing-icon.svg';

      service.addSvgIcon(iconName, url);
      const icon = service.getSvgIcon(iconName);

      expect(icon).toBeTruthy();
      expect(icon?.url).toBe(url);
    });

    it('should return undefined for a non-existing icon', () => {
      const icon = service.getSvgIcon('nonExistingIcon');
      expect(icon).toBeUndefined();
    });
  });
});
