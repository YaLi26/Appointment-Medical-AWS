import { randomUUID } from 'crypto';

export type AppointmentStatus = 'pending' | 'completed';

export interface AppointmentProps {
  appointmentId: string;
  insuredId: string;
  scheduleId: number;
  countryISO: 'PE' | 'CL';
  status: AppointmentStatus;
  createdAt: Date;
}

export class Appointment {
  constructor(private props: AppointmentProps) {}

  public static create(dto: {
    insuredId: string;
    scheduleId: number;
    countryISO: 'PE' | 'CL';
  }) {
    return new Appointment({
      appointmentId: randomUUID(),
      insuredId: dto.insuredId,
      scheduleId: dto.scheduleId,
      countryISO: dto.countryISO,
      status: 'pending',
      createdAt: new Date(),
    });
  }

  get id() {
    return this.props.appointmentId;
  }
  get insuredId() {
    return this.props.insuredId;
  }
  get scheduleId() {
    return this.props.scheduleId;
  }
  get countryISO() {
    return this.props.countryISO;
  }
  get status() {
    return this.props.status;
  }
  get createdAt() {
    return this.props.createdAt;
  }

  toPrimitives() {
    return {
      appointmentId: this.props.appointmentId,
      insuredId: this.props.insuredId,
      scheduleId: this.props.scheduleId,
      countryISO: this.props.countryISO,
      status: this.props.status,
      createdAt: this.props.createdAt.toISOString(),
    };
  }
}
