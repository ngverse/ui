export class DayCell {
  constructor(
    public display: string,
    public date: Date,
    public isInMonth: boolean,
    public value: number
  ) {}
}
