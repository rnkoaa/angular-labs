export class PageNumber {
  enabled = true;
  previous: boolean;
  current: boolean;
  next: boolean;
  value: number;
  display: string;

  constructor(value: number,
    display: string,
    previous: boolean, current: boolean,
    next: boolean,
    enabled: boolean) {
    this.value = value;
    this.display = display;
    this.previous = previous;
    this.current = current;
    this.next = next;
    this.enabled = enabled;
  }
}
