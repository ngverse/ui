import { Pipe, PipeTransform } from '@angular/core';

type MAP_CALLBACK<T> = string | ((value: T, index: number) => unknown);

@Pipe({
  name: 'map',
})
export class MapPipe implements PipeTransform {
  transform<T>(input: T[], fn: MAP_CALLBACK<T>): unknown[] {
    if (typeof fn === 'string') {
      return input.map((v) => (v as Record<string, unknown>)[fn]);
    }
    return input.map(fn);
  }
}
