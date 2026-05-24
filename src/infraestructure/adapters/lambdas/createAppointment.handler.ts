import 'reflect-metadata';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { CreateAppointmentUseCase } from '../../../application/use-cases/create-appointment.use-case';
import { DynamoDbRepository } from '../db/dynamodb.repository';
import { SnsAppointmentPublisher } from '../events/snsAppointment';

const repository = new DynamoDbRepository();
const publisher = new SnsAppointmentPublisher();
const useCase = new CreateAppointmentUseCase(repository, publisher);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const dto = JSON.parse(event.body ?? '{}');
    const result = await useCase.execute(dto);
    return {
      statusCode: 202,
      body: JSON.stringify(result)
    };
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors: JSON.parse(error.message) })
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error', error: error.message })
    };
  }
};