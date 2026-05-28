export class InsuredId {
  private readonly value: string;

  constructor(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error('InsuredId no puede estar vacío.');
    }
    if (!/^\d{5}$/.test(value)) {
      throw new Error('InsuredId debe tener exactamente 5 dígitos.');
    }
    this.value = value;
  }

  getValue(): string {
    return this.value;
  }

  equals(other: InsuredId): boolean {
    return this.value === other.getValue();
  }
}