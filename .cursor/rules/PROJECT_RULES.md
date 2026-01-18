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

*   **Configuração:** Use **apenas** o arquivo `jest.config.js` na raiz. Remova qualquer configuração redundante de `jest` no `package.json` para evitar conflitos.
*   **Localização:** Testes unitários devem ficar em `test/unit/<contexto>/` (ex: `test/unit/patient/patient.service.spec.ts`).
*   **Idioma:** Escreva todas as descrições de testes (`describe`, `it`) em **Português**.
*   **Mocks de Módulos (ESM):**
    *   Para módulos como `uuid`, use o mapeamento global no `jest.config.js` (`moduleNameMapper`) apontando para um mock simples (`test/mocks/uuid.mock.ts`).
    *   Evite `jest.mock(...)` repetitivo dentro de cada arquivo de teste.

## 💾 Banco de Dados (Prisma)

*   **Versão:** Use **Prisma v5** (`5.22.0`) para estabilidade.
*   **Geração de IDs:** Use UUIDs gerados no Service.

## 📝 Estilo de Código

*   **Linting:** Siga o padrão `eslint:recommended` + `prettier`.
*   **Imports:** Mantenha imports organizados e use `"printWidth": 120`.
