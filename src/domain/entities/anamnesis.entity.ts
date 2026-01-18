export class Anamnesis {
  constructor(
    public readonly id: string,
    public patientId: string,
    public roleId: string,
    public healthHistory: string,
    public socialHistory: string,
    public socialComplaint: string,
    public termSignature: string | null,
  ) {}

  // Exemplo de regra de negócio: Verificar se está assinada
  get isSigned(): boolean {
    return !!this.termSignature;
  }
}
