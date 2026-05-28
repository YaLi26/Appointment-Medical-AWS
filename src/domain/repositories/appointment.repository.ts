import { Appointment } from '../models/appointment';
import { AppointmentStatus } from '../models/appointment.types';

export interface IAppointmentRepository {
  save(appointment: Appointment): Promise<void>;
  updateStatus(
    insuredId: string,
    appointmentId: string,
    status: AppointmentStatus,
  ): Promise<void>;
  findByInsuredId(insuredId: string): Promise<Appointment[]>;
}
