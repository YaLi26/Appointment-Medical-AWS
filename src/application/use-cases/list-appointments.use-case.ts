import { IAppointmentRepository } from '../../domain/repositories/appointment.repository';

export class ListAppointmentsUseCase {
  constructor(private readonly repository: IAppointmentRepository) {}

  async execute(insuredId: string) {
    return await this.repository.findByInsuredId(insuredId);
  }
}
