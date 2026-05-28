import { IMysqlAppointmentRepository } from 'src/domain/ports/mysql-appointment.repository';

export class MysqlAppointmentRepository implements IMysqlAppointmentRepository {
  async save(data: {
    appointmentId: string;
    insuredId: string;
    scheduleId: number;
    countryISO: string;
  }): Promise<void> {
    console.log(
      `Appointment saves in MySQL ('${data.appointmentId}', '${data.insuredId}', ${data.scheduleId})`,
    );
    return Promise.resolve();
  }
}
