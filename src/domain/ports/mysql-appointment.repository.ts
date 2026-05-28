export interface IMysqlAppointmentRepository {
  saveInMysqlDb(data: {
    appointmentId: string;
    insuredId: string;
    scheduleId: number;
    countryISO: string;
  }): Promise<void>;
}
