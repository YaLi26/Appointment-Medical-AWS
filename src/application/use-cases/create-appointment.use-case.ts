import { IAppointmentCreatedPublisher } from 'src/domain/ports/snsAppointment.publisher';
import { Appointment } from '../../domain/models/appointment';
import { IAppointmentRepository } from '../../domain/repositories/appointment.repository';
import { AppointmentMedicalDto } from '../dto/AppointmentMedicalDto';

export class CreateAppointmentUseCase {
  constructor(
    private readonly repository: IAppointmentRepository,
    private readonly eventPublisher: IAppointmentCreatedPublisher,
  ) {}

  async execute(dto: AppointmentMedicalDto) {
    const appointment = Appointment.create(dto);

    await this.repository.save(appointment);
    await this.eventPublisher.publishCreatedEvent(appointment);

    return {
      appointmentId: appointment.id,
      message: 'El agendamiento está en proceso.',
    };
  }
}
