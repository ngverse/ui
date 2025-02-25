import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { IconRegistry } from './icon.registry';

describe('IconRegistry', () => {
  let service: IconRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    service = TestBed.inject(IconRegistry);
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
