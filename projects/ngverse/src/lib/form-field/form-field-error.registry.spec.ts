import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormFieldErrorRegistry } from './form-field-error.registry';

describe('FormFieldErrorRegistry', () => {
  let service: FormFieldErrorRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    service = TestBed.inject(FormFieldErrorRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('add should add new errors and not delete old ones', () => {
    service.addErrors({ error: 'error' });
    service.addErrors({ error2: 'error2' });
    expect(service.getMessage('error')).toBe('error');
    expect(service.getMessage('error2')).toBe('error2');
  });
  it('set should replace old errors', () => {
    service.addErrors({ error: 'error' });
    service.setErrors({ error2: 'error2' });
    expect(service.getMessage('error')).toBe(undefined);
    expect(service.getMessage('error2')).toBe('error2');
  });
  it('should return undefined on not found error', () => {
    expect(service.getMessage('error')).toBe(undefined);
  });
  it('getLabel should return proper string', () => {
    service.addErrors({ error: 'error' });
    expect(service.getMessage('error')).toBe('error');
  });
  it('getLabel should call callback function with error params', () => {
    service.addErrors({ error: (params) => `error ${params}` });
    expect(service.getMessage('error', 'params')).toBe('error params');
  });
});
