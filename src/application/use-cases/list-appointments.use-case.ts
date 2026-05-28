import { InsuredId } from 'src/domain/value-objects/insured-id.vo';
import { IAppointmentRepository } from '../../domain/repositories/appointment.repository';

export class ListAppointmentsUseCase {
  constructor(private readonly repository: IAppointmentRepository) {}

  async execute(insuredId: string) {
    new InsuredId(insuredId);
    return await this.repository.findByInsuredId(insuredId);
  }
}
