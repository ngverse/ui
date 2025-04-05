import { Pipe, PipeTransform } from '@angular/core';

/**
 * A pipe that returns the character at the specified index in the given string.
 */
@Pipe({
  name: 'charAt',
})
export class CharAtPipe implements PipeTransform {
  /**
   * Returns the character at the specified index in the given string.
   *
   * If the string is null or undefined, the function returns undefined.
   *
   * If the index is out of bounds, the function returns undefined.
   *
   * @param value The string to get the character from.
   * @param index The index of the character to get, defaults to 0.
   * @returns The character at the specified index, or undefined if the string is null or undefined, or the index is out of bounds.
   */
  transform(value: string | undefined | null, index = 0): string | undefined {
    return value?.charAt(index) ?? undefined;
  }
}
