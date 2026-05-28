import { IsIn, IsInt, IsNotEmpty, IsPositive, IsString, Matches } from 'class-validator';

export class AppointmentMedicalDto {
  @IsString()
  insuredId: string;

  @IsInt()
  scheduleId: number;

  @IsString()
  countryISO: string;
}
