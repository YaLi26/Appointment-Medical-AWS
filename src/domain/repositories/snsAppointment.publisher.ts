import { Appointment } from '../models/appointment';

export interface IAppointmentCreatedPublisher {
  publishCreatedEvent(appointment: Appointment): Promise<void>;
}
