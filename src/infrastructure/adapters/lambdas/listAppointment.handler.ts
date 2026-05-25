import { APIGatewayProxyHandler } from 'aws-lambda';
import { ListAppointmentsUseCase } from '../../../application/use-cases/list-appointments.use-case';
import { DynamoDbRepository } from '../db/dynamodb.repository';

const repository = new DynamoDbRepository();
const useCase = new ListAppointmentsUseCase(repository);

export const handler: APIGatewayProxyHandler = async (event) => {
  try {
    const insuredId = event.pathParameters?.insuredId;
    if (!insuredId || !/^[0-9]{5}$/.test(insuredId)) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'El parámetro insuredId debe constar de 5 dígitos.',
        }),
      };
    }
    const appointments = await useCase.execute(insuredId);
    return {
      statusCode: 200,
      body: JSON.stringify(appointments),
    };
  } catch (error: any) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
