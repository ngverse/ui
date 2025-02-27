import { inject, Injector } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parentOrNewInstance<T>(type: new (...args: any[]) => T): T {
  const injector = inject(Injector, { skipSelf: true });
  const parentListboxState = injector.get(type, null);
  return parentListboxState ?? new type();
}
