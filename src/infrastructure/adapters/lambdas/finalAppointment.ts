import 'reflect-metadata';
import { SQSHandler } from 'aws-lambda';
import { CompleteAppointmentUseCase } from '../../../application/use-cases/complete-appointment.use-case';
import { DynamoDbRepository } from '../db/dynamodb.repository';

const repository = new DynamoDbRepository();
const useCase = new CompleteAppointmentUseCase(repository);

export const handler: SQSHandler = async (event) => {
  try {
    for (const record of event.Records) {
      const body = JSON.parse(record.body);
      
      const appointmentId = body.appointmentId || (body.Message ? JSON.parse(body.Message).appointmentId : null);
      const insuredId = body.appointmentId || (body.Message ? JSON.parse(body.Message).appointmentId : null);

      if (!appointmentId) {
        console.error('No se encontró appointmentId en el mensaje de SQS');
        continue;
      }

      await useCase.execute(insuredId,appointmentId);
      console.log(`Cita ${appointmentId} completada con éxito.`);
    }
  } catch (error: any) {
    console.error('Error procesando mensajes de SQS:', error.message);
    throw error;
  }
};
