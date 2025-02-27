import { GnBaseRegistry } from './base-registry';

describe('BaseRegistry', () => {
  let service: GnBaseRegistry<unknown>;

  beforeEach(() => {
    service = new GnBaseRegistry();
  });

  it('should create an instance', () => {
    expect(service).toBeTruthy();
  });

  it('should add item', () => {
    const item = {};
    service.add(item);
    expect(service.items()).toContain(item);
  });
  it('should remove item', () => {
    const item = {};
    service.add(item);
    service.remove(item);
    expect(service.items()).not.toContain(item);
  });
});
