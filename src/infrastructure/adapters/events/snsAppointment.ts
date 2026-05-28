import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { IAppointmentCreatedPublisher } from 'src/domain/ports/snsAppointment.publisher';
import { Appointment } from 'src/domain/models/appointment';

export class SnsAppointmentPublisher implements IAppointmentCreatedPublisher {
  private sns = new SNSClient({});
  private snsTopicArn = process.env.TOPIC_ARN!;

  async publishCreatedEvent(appointment: Appointment): Promise<void> {
    const data = appointment.toPrimitives();

    try {
      const result = await this.sns.send(
        new PublishCommand({
          TopicArn: this.snsTopicArn,
          Message: JSON.stringify(data),
          MessageAttributes: {
            countryISO: {
              DataType: 'String',
              StringValue: data.countryISO,
            },
          },
        }),
      );
      console.log(`Evento publicado en SNS: ${result}`);
    } catch (error: any) {
      console.error(`Error al publicar en SNS:`, error.message);
      throw error;
    }
  }
}
