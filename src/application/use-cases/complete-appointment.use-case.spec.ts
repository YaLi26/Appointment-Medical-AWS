import { IAppointmentRepository } from '../../domain/repositories/appointment.repository';
import { CompleteAppointmentUseCase } from './complete-appointment.use-case';

describe('CompleteAppointmentUseCase', () => {
  const mockRepository: jest.Mocked<IAppointmentRepository> = {
    save: jest.fn(),
    updateStatus: jest.fn().mockResolvedValue(undefined),
    findByInsuredId: jest.fn(),
  };

  const useCase = new CompleteAppointmentUseCase(mockRepository);

  beforeEach(() => jest.clearAllMocks());

  it('debe llamar updateStatus con los parámetros correctos', async () => {
    await useCase.execute('12345', '1');

    const { updateStatus } = mockRepository;
    expect(updateStatus).toHaveBeenCalledWith('12345', '1', 'completed');
  });

  it('debe llamar updateStatus exactamente una vez', async () => {
    await useCase.execute('12345', '1');

    const { updateStatus } = mockRepository;
    expect(updateStatus).toHaveBeenCalledTimes(1);
  });

  it('debe lanzar error si updateStatus falla', async () => {
    mockRepository.updateStatus.mockRejectedValueOnce(new Error('DB error'));

    await expect(() => useCase.execute('12345', '1')).rejects.toThrow(
      'DB error',
    );
  });
});
