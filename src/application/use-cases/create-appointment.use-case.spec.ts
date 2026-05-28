import { CreateAppointmentUseCase } from './create-appointment.use-case';
import { Appointment } from '../../domain/models/appointment';
import { IAppointmentRepository } from '../../domain/repositories/appointment.repository';
import { IAppointmentCreatedPublisher } from 'src/domain/ports/snsAppointment.publisher';
import { AppointmentMedicalDto } from '../dto/AppointmentMedicalDto';

jest.mock('../../domain/models/appointment', () => ({
  Appointment: {
    create: jest.fn(),
  },
}));

describe('CreateAppointmentUseCase', () => {
  const mockAppointment = { id: '12345', insuredId: '12345' } as Appointment;

  const mockDto: AppointmentMedicalDto = {
    insuredId: '12345',
    scheduleId: 1,
    countryISO: 'PE' as const,
  };

  const repository: jest.Mocked<IAppointmentRepository> = {
    save: jest.fn().mockResolvedValue(undefined),
    updateStatus: jest.fn(),
    findByInsuredId: jest.fn(),
  };

  const eventPublisher: jest.Mocked<IAppointmentCreatedPublisher> = {
    publishCreatedEvent: jest.fn().mockResolvedValue(undefined),
  };

  const useCase = new CreateAppointmentUseCase(repository, eventPublisher);

  beforeEach(() => {
    jest.clearAllMocks();
    (Appointment.create as jest.Mock).mockReturnValue(mockAppointment);
  });

  it('debe retornar appointmentId y mensaje', async () => {
    const result = await useCase.execute(mockDto);
    expect(result).toEqual({
      appointmentId: '12345',
      message: 'El agendamiento está en proceso.',
    });
  });

  it('debe llamar save y publishCreatedEvent con el appointment', async () => {
    await useCase.execute(mockDto);
    const { save } = repository;
    const { publishCreatedEvent } = eventPublisher;
    expect(save).toHaveBeenCalledWith(mockAppointment);
    expect(publishCreatedEvent).toHaveBeenCalledWith(mockAppointment);
  });

  it('debe lanzar error y no publicar si save() falla', async () => {
    repository.save.mockRejectedValueOnce(new Error('DB error'));
    await expect(() => useCase.execute(mockDto)).rejects.toThrow('DB error');
    expect(eventPublisher.publishCreatedEvent).not.toHaveBeenCalled();
  });
});
