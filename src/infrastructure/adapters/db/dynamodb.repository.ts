/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { DynamoDBClient, DynamoDBClientConfig } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  PutCommand,
  UpdateCommand,
  QueryCommand,
  PutCommandInput,
  UpdateCommandInput,
  QueryCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { Appointment, AppointmentStatus } from 'src/domain/models/appointment';
import { IAppointmentRepository } from 'src/domain/repositories/appointment.repository';

export class DynamoDbRepository implements IAppointmentRepository {
  private readonly client: DynamoDBClient;
  private readonly dynamo: DynamoDBDocumentClient;
  private readonly tableName: string;

  constructor() {
    const config: DynamoDBClientConfig = {};
    this.client = new DynamoDBClient(config);
    this.dynamo = DynamoDBDocumentClient.from(this.client);
    this.tableName = process.env.TABLE_NAME || '';
  }

  async saveInDynamoDB(appointment: Appointment): Promise<void> {
    const input: PutCommandInput = {
      TableName: this.tableName,
      Item: appointment.toPrimitives(),
    };
    await this.dynamo.send(new PutCommand(input));
  }

  async updateStatus(
    insuredId: string,
    appointmentId: string,
    status: AppointmentStatus,
  ): Promise<void> {
    const input: UpdateCommandInput = {
      TableName: this.tableName,
      Key: { insuredId, appointmentId },
      UpdateExpression: 'SET #st = :status',
      ExpressionAttributeNames: { '#st': 'status' },
      ExpressionAttributeValues: { ':status': status },
    };
    await this.dynamo.send(new UpdateCommand(input));
  }

  async findByInsuredId(insuredId: string): Promise<Appointment[]> {
    const input: QueryCommandInput = {
      TableName: this.tableName,
      KeyConditionExpression: 'insuredId = :insuredId',
      ExpressionAttributeValues: { ':insuredId': insuredId },
    };

    const result = await this.dynamo.send(new QueryCommand(input));
    const items = result.Items ?? [];

    return items.map(
      (item) =>
        new Appointment({
          appointmentId: String(item.appointmentId),
          insuredId: String(item.insuredId),
          scheduleId: Number(item.scheduleId),
          countryISO: item.countryISO as 'PE' | 'CL',
          status: item.status as AppointmentStatus,
          createdAt: new Date(String(item.createdAt)),
        }),
    );
  }
}
