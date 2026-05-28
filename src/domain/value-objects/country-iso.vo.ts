const VALID_COUNTRIES = ['PE', 'CL'] as const;
export type CountryCode = typeof VALID_COUNTRIES[number];

export class CountryISO {
  private readonly value: CountryCode;

  constructor(value: string) {
    if (!VALID_COUNTRIES.includes(value as CountryCode)) {
      throw new Error(`País no soportado: ${value}. Válidos: ${VALID_COUNTRIES.join(', ')}.`);
    }
    this.value = value as CountryCode;
  }

  getValue(): CountryCode {
    return this.value;
  }

  equals(other: CountryISO): boolean {
    return this.value === other.getValue();
  }
}