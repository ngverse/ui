import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'charAt',
})
export class CharAtPipe implements PipeTransform {
  transform(
    value: string | undefined | null,
    index: number
  ): string | undefined {
    return value?.charAt(index) ?? undefined;
  }
}
