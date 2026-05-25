import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';
import { Appointment } from 'src/domain/models/appointment';
import { IAppointmentCreatedPublisher } from 'src/domain/repositories/snsAppointment.publisher';

export class SnsAppointmentPublisher implements IAppointmentCreatedPublisher {
  private sns = new SNSClient({});
  private snsTopicArn = process.env.TOPIC_ARN!;

  async publishCreatedEvent(appointment: Appointment): Promise<void> {
    const data = appointment.toPrimitives();
    await this.sns.send(
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
  }
}
