export class Patient {
  constructor(
    public readonly id: string,
    public name: string,
    public birthDate: Date,
    public diagnosis: string | null,
    public isActive: boolean,
    public createdAt?: Date,
    public updatedAt?: Date,
  ) {}

  // Método de domínio para calcular idade (exemplo de lógica rica)
  get age(): number {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();
    const m = today.getMonth() - this.birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < this.birthDate.getDate())) {
      age--;
    }
    return age;
  }

  updateDetails(name?: string, birthDate?: Date, diagnosis?: string, isActive?: boolean): void {
    if (name !== undefined) this.name = name;
    if (birthDate !== undefined) this.birthDate = birthDate;
    if (diagnosis !== undefined) this.diagnosis = diagnosis;
    if (isActive !== undefined) this.isActive = isActive;
    this.updatedAt = new Date();
  }

  deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }
}
