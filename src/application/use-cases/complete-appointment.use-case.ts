import { InsuredId } from 'src/domain/value-objects/insured-id.vo';
import { IAppointmentRepository } from '../../domain/repositories/appointment.repository';
import { AppointmentStatus } from 'src/domain/models/appointment.types';

export class CompleteAppointmentUseCase {
  constructor(private readonly repository: IAppointmentRepository) {}

  async execute(insuredId: string, appointmentId: string) {
    new InsuredId(insuredId);
    const status: AppointmentStatus = 'completed';
    await this.repository.updateStatus(insuredId, appointmentId, status);
  }
}
