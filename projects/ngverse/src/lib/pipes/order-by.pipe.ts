import { Pipe, PipeTransform } from '@angular/core';
import orderBy from 'lodash/orderBy';
@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform<T>(value: T[], field?: string) {
    return orderBy(value, field);
  }
}
