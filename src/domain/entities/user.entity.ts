export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public passwordHash: string,
    public name: string,
    public roles: string[], // Array simples de strings por enquanto
    public createdAt?: Date,
  ) {}
}
