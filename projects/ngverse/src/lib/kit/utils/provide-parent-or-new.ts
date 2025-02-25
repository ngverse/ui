import { inject, Injector, Type } from '@angular/core';

/**
 * Returns the parent instance or creates a new instance if not found
 * @param type type to create
 * @returns parent or new instance
 */
export function provideParentOrNew<T>(type: Type<T>): T {
  const injector = inject(Injector, { skipSelf: true });
  const parentInstance = injector.get<T | null>(type, null);
  return parentInstance ?? new type();
}
