import { ListAppointmentsUseCase } from './list-appointments.use-case';
import { IAppointmentRepository } from '../../domain/repositories/appointment.repository';
import { Appointment } from '../../domain/models/appointment';

describe('ListAppointmentsUseCase', () => {
  const mockAppointments = [
    { id: '1', insuredId: '12345' }
  ] as unknown as Appointment[];

  const repository = {
    save: jest.fn(),
    updateStatus: jest.fn(),
    findByInsuredId: jest.fn(),
  } as unknown as jest.Mocked<IAppointmentRepository>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe retornar los appointments del insuredId', async () => {
    repository.findByInsuredId.mockImplementationOnce(() => Promise.resolve(mockAppointments));
    const useCase = new ListAppointmentsUseCase(repository);

    const result = await useCase.execute('12345');
    expect(result).toEqual(mockAppointments);
  });

  it('debe llamar findByInsuredId con el insuredId correcto', async () => {
    repository.findByInsuredId.mockImplementationOnce(() => Promise.resolve(mockAppointments));
    const useCase = new ListAppointmentsUseCase(repository);

    await useCase.execute('12345');
    expect(repository.findByInsuredId).toHaveBeenCalledWith('12345');
  });

  it('debe retornar array vacío si no hay appointments', async () => {
    repository.findByInsuredId.mockImplementationOnce(() => Promise.resolve([]));
    const useCase = new ListAppointmentsUseCase(repository);

    const result = await useCase.execute('99999');
    expect(result).toEqual([]);
  });

  it('debe lanzar error si findByInsuredId falla', async () => {
    repository.findByInsuredId.mockImplementationOnce(() => Promise.reject(new Error('DB error')));
    const useCase = new ListAppointmentsUseCase(repository);

    await expect(() => useCase.execute('12345')).rejects.toThrow('DB error');
  });
});