import { SQSEvent } from 'aws-lambda';
import { MysqlAppointmentRepository } from '../db/mysql.repository';
import { EventBridgeAppointmentPublisher } from '../events/appointmentEventBridge';
import { saveAppointmentUseCase } from 'src/application/use-cases/save-db-appointment.use-case';

const mysqlRepository = new MysqlAppointmentRepository();
const eventPublisher = new EventBridgeAppointmentPublisher();
const useCase = new saveAppointmentUseCase(
  mysqlRepository,
  eventPublisher,
);

export const handler = async (event: SQSEvent): Promise<void> => {
  try {
    for (const record of event.Records) {
      const sqsBody = JSON.parse(record.body);
      const appointmentData =
        typeof sqsBody.Message === 'string'
          ? JSON.parse(sqsBody.Message)
          : sqsBody;

      await useCase.execute({
        insuredId: appointmentData.insuredId,
        scheduleId: appointmentData.scheduleId,
        countryISO: appointmentData.countryISO,
      });
    }
  } catch (error: any) {
    console.log('Error:', error.message);
    throw error;
  }
};
