import { randomUUID } from 'crypto';
import { InsuredId } from '../value-objects/insured-id.vo';
import { ScheduleId } from '../value-objects/schedule-id.vo';
import { CountryISO } from '../value-objects/country-iso.vo';

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
    countryISO: string;
  }) {
    const insuredId = new InsuredId(dto.insuredId);
    const scheduleId = new ScheduleId(dto.scheduleId);
    const countryISO = new CountryISO(dto.countryISO);

    return new Appointment({
      appointmentId: randomUUID(),
      insuredId: insuredId.getValue(),
      scheduleId: scheduleId.getValue(),
      countryISO: countryISO.getValue(),
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
