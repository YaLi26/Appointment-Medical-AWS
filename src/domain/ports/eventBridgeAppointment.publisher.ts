import { Appointment } from '../models/appointment';

export interface IAppointmentConfirmationPublisher {
  publishConfirmationEvent(appointment: Appointment): Promise<void>;
}
