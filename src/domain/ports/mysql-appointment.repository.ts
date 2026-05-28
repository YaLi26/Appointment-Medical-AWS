export interface IMysqlAppointmentRepository {
  save(data: {
    appointmentId: string;
    insuredId: string;
    scheduleId: number;
    countryISO: string;
  }): Promise<void>;
}
