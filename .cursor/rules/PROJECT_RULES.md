# Regras do Projeto - EloNeuroKids API

Você é um Engenheiro Backend Sênior especializado em NestJS, TypeScript, Prisma ORM e Clean Architecture. Siga estas diretrizes estritamente.

## 🏗️ Arquitetura e Estrutura

*   **Arquitetura:** Clean Architecture (Domain, Application, Infrastructure, Presentation).
*   **Padrão NestJS:**
    *   Camada de Aplicação deve usar **Services** (`*.service.ts`) agrupando lógica de recursos (ex: `PatientService` contém `create`, `findAll`, etc.).
    *   NÃO use o sufixo "UseCase" para classes de serviço.
    *   Use Injeção de Dependência via construtor para tudo.
*   **Domain:** Entidades puras, sem dependências de framework ou ORM.
*   **Infrastructure:** Implementações de repositórios, Prisma, estratégias de Auth.
*   **Presentation:** Controllers, DTOs e Swagger.

## 🛣️ Path Aliases (Obrigatório)

Sempre use os **Path Aliases** definidos no `tsconfig.json` em vez de caminhos relativos longos (`../../../`):

*   `@domain/*` -> `src/domain/*`
*   `@application/*` -> `src/application/*`
*   `@infrastructure/*` -> `src/infrastructure/*`
*   `@presentation/*` -> `src/presentation/*`
*   `@dtos/*` -> `src/application/dtos/*`
*   `@entities/*` -> `src/domain/entities/*`

**Exemplo Correto:**
```typescript
import { CreatePatientDto } from '@dtos/create-patient.dto';
```

## 🧪 Testes (Jest)

*   **Localização:** Testes unitários devem ficar em `test/unit/<contexto>/` (ex: `test/unit/patient/patient.service.spec.ts`).
*   **Idioma:** Escreva todas as descrições de testes (`describe`, `it`) em **Português**.
    *   Exemplo: `describe('criar', () => { it('deve criar um paciente com sucesso', ...)})`.
*   **Mocks de Módulos (ESM):**
    *   Para módulos que exportam ESM (como `uuid`), use `jest.mock()` no topo do arquivo de teste para evitar erros de sintaxe (`Unexpected token export`).
    *   **NÃO** crie pastas `__mocks__` globais a menos que estritamente necessário. Prefira mocks locais ou inline.
    *   **Exemplo:**
        ```typescript
        jest.mock('uuid', () => ({
          v4: () => 'test-uuid',
        }));
        ```

## 💾 Banco de Dados (Prisma)

*   **Versão:** Use **Prisma v5** (`5.22.0`) para estabilidade. Evite a v7 por enquanto devido a breaking changes na configuração de URL.
*   **Geração de IDs:**
    *   Use UUIDs (`uuid` v4).
    *   **Gere o ID na Camada de Aplicação (Service)** antes de persistir, garantindo que a Entidade de Domínio sempre tenha identidade válida.
    *   Não delegue a geração de ID para o banco se possível.

## 📝 Estilo de Código

*   **Linting:** Siga o padrão `eslint:recommended` + `prettier`.
*   **Imports:** Mantenha imports organizados e use `"printWidth": 120` no Prettier para evitar quebras de linha desnecessárias em imports.
*   **Nomenclatura:**
    *   Services: `PatientService`, `AuthService`.
    *   Repositories Interfaces: `IPatientRepository`.
    *   Repositories Implementations: `PrismaPatientRepository`.
