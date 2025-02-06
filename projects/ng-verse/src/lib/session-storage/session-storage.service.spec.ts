import { TestBed } from '@angular/core/testing';

import {
  PLATFORM_ID,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import {
  SESSION_STORAGE_TOKEN,
  SessionStorageService,
} from './session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;

  describe('InBrowser', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideExperimentalZonelessChangeDetection()],
      });
      service = TestBed.inject(SessionStorageService);
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should be enabled=true', () => {
      expect(service.enabled).toBeTruthy();
    });
    it('should call set item', () => {
      service.setItem('test', 'test');
      expect(sessionStorage.getItem('test')).toBe('test');
    });
    it('should call get item', () => {
      sessionStorage.setItem('test', 'test');
      expect(service.getItem('test')).toBe('test');
    });
    it('should call remove item', () => {
      sessionStorage.setItem('test', 'test');
      service.removeItem('test');
      expect(sessionStorage.getItem('test')).toBe(null);
    });
    it('should call clear', () => {
      sessionStorage.setItem('test', 'test');
      service.clear();
      expect(sessionStorage.getItem('test')).toBe(null);
    });
    it('should call key', () => {
      sessionStorage.setItem('test', 'test');
      expect(service.key(0)).toBe('test');
    });
    it('should call length', () => {
      sessionStorage.setItem('test', 'test');
      expect(service.length).toBe(1);
    });
  });
  describe('NotInBrowser', () => {
    const spyStorageMock = {
      length: 0,
      key: () => null,
      getItem: () => null,
      setItem: () => null,
      removeItem: () => null,
      clear: () => null,
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideExperimentalZonelessChangeDetection(),
          { provide: PLATFORM_ID, useValue: 'server' },
          { provide: SESSION_STORAGE_TOKEN, useValue: spyStorageMock },
        ],
      });
      service = TestBed.inject(SessionStorageService);
    });
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should be enabled false', () => {
      expect(service.enabled).toBe(false);
    });
    it('should call set item', () => {
      spyOn(spyStorageMock, 'setItem');
      service.setItem('test', 'test');
      expect(spyStorageMock.setItem).toHaveBeenCalled();
    });
    it('should call get item', () => {
      spyOn(spyStorageMock, 'getItem');
      service.getItem('test');
      expect(spyStorageMock.getItem).toHaveBeenCalled();
    });
    it('should call remove item', () => {
      spyOn(spyStorageMock, 'removeItem');
      service.removeItem('test');
      expect(spyStorageMock.removeItem).toHaveBeenCalled();
    });
    it('should call clear', () => {
      spyOn(spyStorageMock, 'clear');
      service.clear();
      expect(spyStorageMock.clear).toHaveBeenCalled();
    });
    it('should call key', () => {
      spyOn(spyStorageMock, 'key');
      service.key(0);
      expect(spyStorageMock.key).toHaveBeenCalled();
    });
    it('should call length', () => {
      expect(service.length).toBe(0);
    });
  });
});
