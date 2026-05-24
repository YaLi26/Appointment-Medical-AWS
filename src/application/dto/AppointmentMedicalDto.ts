import { IsIn, IsNotEmpty, IsString, Matches } from 'class-validator';

export class AppointmentMedicalDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{5}$/)
  insuredId: string;

  @IsNotEmpty()
  scheduleId: number;

  @IsNotEmpty()
  @IsString()
  @IsIn(['PE', 'CL'], { message: 'El countryISO solo puede ser "PE" o "CL".' })
  countryISO: 'PE' | 'CL';
}
