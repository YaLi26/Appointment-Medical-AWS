import {
  EventBridgeClient,
  PutEventsCommand,
} from '@aws-sdk/client-eventbridge';
import { IAppointmentConfirmationPublisher } from 'src/domain/ports/eventBridgeAppointment.publisher';
import { Appointment } from 'src/domain/models/appointment';

export class EventBridgeAppointmentPublisher implements IAppointmentConfirmationPublisher {
  private eventBridge = new EventBridgeClient({});
  private eventBusName = process.env.EVENT_NAME!;

  async publishConfirmationEvent(appointment: Appointment): Promise<void> {
    const data = appointment.toPrimitives();

    try {
      const result = await this.eventBridge.send(
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

      console.log(`Evento publicado en EventBridge:`, result.Entries);
    } catch (error: any) {
      console.error(`Error al publicar en EventBridge:`, error.message);
      throw error;
    }
  }
}
