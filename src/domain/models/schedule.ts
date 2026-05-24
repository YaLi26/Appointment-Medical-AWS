export interface ScheduleProps {
  id: number;
  centerId: number;
  specialtyId: number;
  medicId: number;
  date: Date;
  available: boolean;
}

export class Schedule {
  constructor(private props: ScheduleProps) {}

  public isAvailable(): boolean {
    return this.props.available;
  }

  public reserve(): void {
    this.props.available = false;
  }

  public toPrimitives() {
    return {
      ...this.props,
      date: this.props.date.toISOString(),
    };
  }
}
