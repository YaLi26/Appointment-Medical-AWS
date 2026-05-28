
export class ScheduleId {
  private readonly value: number;

  constructor(value: number) {
    if (!Number.isInteger(value) || value <= 0) {
      throw new Error('ScheduleId debe ser un entero positivo.');
    }
    this.value = value;
  }

  getValue(): number {
    return this.value;
  }

  equals(other: ScheduleId): boolean {
    return this.value === other.getValue();
  }
}