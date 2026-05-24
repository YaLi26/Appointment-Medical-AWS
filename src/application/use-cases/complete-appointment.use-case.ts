import { IAppointmentRepository } from '../../domain/repositories/appointment.repository';

export class CompleteAppointmentUseCase {
  constructor(private readonly repository: IAppointmentRepository) {}

  async execute(insuredId: string, appointmentId: string) {
    await this.repository.updateStatus(insuredId, appointmentId, 'completed');
  }
}
