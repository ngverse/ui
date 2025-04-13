import { Injectable, Provider, signal } from '@angular/core';
import { CellDirective } from '../core/cell.directive';

@Injectable()
export class KeyState {
  private _cells = signal<CellDirective[]>([]);

  onKeydown(cell: CellDirective, $event: KeyboardEvent) {
    const isArrowLeft = $event.key === 'ArrowLeft';
    const isArrowRight = $event.key === 'ArrowRight';
    const isArrowUp = $event.key === 'ArrowUp';
    const isArrowDown = $event.key === 'ArrowDown';
    const isEnter = $event.key === 'Enter';
    const isSpace = $event.key === ' ';
    if (
      isArrowLeft ||
      isArrowRight ||
      isArrowUp ||
      isArrowDown ||
      isEnter ||
      isSpace
    ) {
      $event.preventDefault();
    }
  }

  add(cell: CellDirective) {
    this._cells.update((cells) => [...cells, cell]);
  }
  remove(cell: CellDirective) {
    this._cells.update((cells) => cells.filter((c) => c !== cell));
  }
}

export const provideKeyState: Provider = {
  provide: KeyState,
  useClass: KeyState,
};
