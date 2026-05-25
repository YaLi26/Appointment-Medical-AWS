import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge';
import { Appointment } from 'src/domain/models/appointment';
import { IAppointmentConfirmationPublisher } from 'src/domain/repositories/eventBridgeAppointment.publisher';

export class EventBridgeAppointmentPublisher implements IAppointmentConfirmationPublisher {
  private eventBridge = new EventBridgeClient({});
  private eventBusName = process.env.EVENT_BUS_NAME!;

  async publishConfirmationEvent(appointment: Appointment): Promise<void> {
    const data = appointment.toPrimitives();
    await this.eventBridge.send(
      new PutEventsCommand({
        Entries: [
          {
            Source: `appointment.${data.countryISO.toLowerCase()}`,
            DetailType: 'AppointmentConfirmed',
            Detail: JSON.stringify(data),
            EventBusName: this.eventBusName,
          },
        ],
      }),
    );
  }
}
