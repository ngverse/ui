import { TestBed } from '@angular/core/testing';
import { IconRegistryService } from './icon-registry.service';

describe('IconRegistryService', () => {
  let service: IconRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct icon when it exists', () => {
    const iconName = 'existingIcon';
    const url = 'assets/icons/existing-icon.svg';

    service.addIcon(iconName, url);
    const icon = service.getUrl(iconName);

    expect(icon).toBeTruthy();
    expect(icon).toBe(url);
  });

  it('should return undefined for a non-existing icon', () => {
    const icon = service.getUrl('nonExistingIcon');
    expect(icon).toBeUndefined();
  });
});
