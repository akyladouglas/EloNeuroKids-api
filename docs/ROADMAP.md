# Roadmap de Desenvolvimento - EloNeuroKids (NestJS Edition)

**Stack:** NestJS, Prisma ORM, PostgreSQL, Vue.js 3.  
**Objetivo:** Backend Node.js robusto com tipagem forte e Clean Architecture.

## 🏗️ Etapa 1: Setup e Camada de Domínio
**Foco:** Criar a estrutura do projeto e definir as regras de negócio sem pensar em banco de dados ainda.

### Inicialização
```bash
nest new eloneurokids-api
mkdir -p src/{domain,application,infrastructure,presentation}
```

### Prisma Setup (Database)
```bash
npm install prisma --save-dev
npx prisma init
```

### Modelagem
*   Escrever o arquivo `schema.prisma` traduzindo o diagrama ER (Patient, Anamnesis, PeiGoal).
*   **Dica:** Use Enums do Prisma para `SupportLevel` e `Mood`.

### Domínio (Entities & Interfaces)
*   Criar as classes no `src/domain/entities`. Elas não devem ter dependência do Prisma.
*   Definir interfaces em `src/domain/repositories` (Ex: `patient.repository.interface.ts`).

## 🧠 Etapa 2: Aplicação e Infraestrutura
**Foco:** Conectar o NestJS ao Banco de Dados e criar os CRUDs.

### Implementação de Infra (Prisma)
*   Criar `PrismaService` (Wrapper de conexão).
*   Implementar `PrismaPatientRepository` que usa o `PrismaService` mas implementa a interface do domínio `IPatientRepository`.
*   **Mappers:** Criar funções para converter Prisma Model -> Domain Entity.

### Camada de Aplicação (Use Cases)
*   Criar `CreatePatientUseCase`.
*   Usar DTOs com `class-validator`:
```typescript
export class CreatePatientDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
```

### Controllers (Presentation)
*   Injetar o UseCase no Controller, não o Repositório direto.

## 🔐 Etapa 3: Autenticação e Segurança
**Foco:** Proteger o sistema com JWT.

### Auth Module
*   Instalar `@nestjs/passport`, `passport-jwt`, `bcrypt`.
*   Criar `AuthService` para validar usuário e gerar token.
*   Criar `JwtStrategy` para proteger rotas com `@UseGuards(JwtAuthGuard)`.

### Roles Guard
*   Criar um Decorator `@Roles('FONOAUDIOLOGO')` para restringir acesso à Anamnese.

## ⚡ Etapa 4: Motor de Evolução e Realtime
**Foco:** A lógica complexa e notificações.

### Domain Service (O Algoritmo)
*   Criar `EvolutionService` no Domain.
*   **Lógica:** Receber histórico de sessões e retornar boolean se deve mudar de fase.

### WebSockets (Gateways)
*   Criar `NotificationGateway` (`@WebSocketGateway()`).
*   No UseCase de `RegisterSession`, se a evolução for detectada:
```typescript
this.notificationGateway.server.to(patientId).emit('milestone-reached', data)
```

## 🎨 Etapa 5: Frontend (Vue.js)
**Foco:** Consumir a API NestJS.

### Integração
*   Usar Axios apontando para `http://localhost:3000`.
*   Usar `socket.io-client` para ouvir os eventos do Gateway.

## 🏆 Resumo da Arquitetura NestJS
1.  Request chega no **Controller**.
2.  Controller valida DTO (`ValidationPipe`) e chama **UseCase**.
3.  UseCase aplica regras de negócio e chama **Repository Interface**.
4.  Repository Implementation usa **Prisma** para falar com o banco.
5.  Dados retornam mapeados para o formato de resposta.
