import { IMysqlAppointmentRepository } from '../../domain/repositories/mysql-appointment.repository';
import { IAppointmentConfirmationPublisher } from 'src/domain/repositories/eventBridgeAppointment.publisher';
import { Appointment } from '../../domain/models/appointment';
import { saveInMysqlDbAppointmentUseCase } from './save-db-appointment.use-case';

describe('saveInMysqlDbAppointmentUseCase', () => {
  const dto = {
    insuredId: '98765',
    scheduleId: 102,
    countryISO: 'PE' as const,
  };

  const mockMysqlRepository = {
    saveInMysqlDb: jest.fn().mockImplementation(() => Promise.resolve()),
  } as unknown as jest.Mocked<IMysqlAppointmentRepository>;

  const mockEventPublisher = {
    publishConfirmationEvent: jest
      .fn()
      .mockImplementation(() => Promise.resolve()),
  } as unknown as jest.Mocked<IAppointmentConfirmationPublisher>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe guardar la cita médica en la bbdd MySQL, publicar el evento de confirmación en EventBridge y retornar éxito', async () => {
    const useCase = new saveInMysqlDbAppointmentUseCase(
      mockMysqlRepository,
      mockEventPublisher,
    );

    const result = await useCase.execute(dto);

    expect(result).toHaveProperty('appointmentId');
    expect(result.message).toBe('Procesado correctamente');

    expect(mockMysqlRepository.saveInMysqlDb).toHaveBeenCalledTimes(1);
    expect(mockMysqlRepository.saveInMysqlDb).toHaveBeenCalledWith({
      appointmentId: expect.any(String),
      insuredId: dto.insuredId,
      scheduleId: dto.scheduleId,
      countryISO: dto.countryISO,
    });

    expect(mockEventPublisher.publishConfirmationEvent).toHaveBeenCalledTimes(
      1,
    );
    expect(mockEventPublisher.publishConfirmationEvent).toHaveBeenCalledWith(
      expect.any(Appointment),
    );
  });

  it('debe lanzar un error si la inserción en la base de datos MySQL falla', async () => {
    mockMysqlRepository.saveInMysqlDb.mockImplementationOnce(() =>
      Promise.reject(new Error('MySQL Connection Timeout')),
    );

    const useCase = new saveInMysqlDbAppointmentUseCase(
      mockMysqlRepository,
      mockEventPublisher,
    );

    await expect(() => useCase.execute(dto)).rejects.toThrow(
      'MySQL Connection Timeout',
    );

    expect(mockEventPublisher.publishConfirmationEvent).not.toHaveBeenCalled();
  });
});
