import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'join',
})
export class JoinPipe implements PipeTransform {
  transform<T>(input: T[], character = ''): string {
    return input.join(character);
  }
}
