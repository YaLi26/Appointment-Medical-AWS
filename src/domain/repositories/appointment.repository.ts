import { Appointment } from '../models/appointment';

export interface IAppointmentRepository {
  saveInDynamoDB(appointment: Appointment): Promise<void>;
  updateStatus(
    insuredId: string,
    appointmentId: string,
    status: 'pending' | 'completed',
  ): Promise<void>;
  findByInsuredId(insuredId: string): Promise<Appointment[]>;
}
