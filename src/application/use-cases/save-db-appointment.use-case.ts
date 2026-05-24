import { IAppointmentConfirmationPublisher } from 'src/domain/repositories/eventBridgeAppointment.publisher';
import { Appointment } from '../../domain/models/appointment';
import { IMysqlAppointmentRepository } from '../../domain/repositories/mysql-appointment.repository';
import { AppointmentMedicalDto } from '../dto/AppointmentMedicalDto';

export class saveInMysqlDbAppointmentUseCase {
  constructor(
    private readonly mysqlRepository: IMysqlAppointmentRepository,
    private readonly eventPublisher: IAppointmentConfirmationPublisher,
  ) {}

  async execute(dto: AppointmentMedicalDto) {
    const appointment = Appointment.create(dto);

    await this.mysqlRepository.saveInMysqlDb({
      appointmentId: appointment.id,
      insuredId: appointment.insuredId,
      scheduleId: appointment.scheduleId,
      countryISO: appointment.countryISO,
    });

    await this.eventPublisher.publishConfirmationEvent(appointment);

    return {
      appointmentId: appointment.id,
      message: 'Procesado correctamente',
    };
  }
}
