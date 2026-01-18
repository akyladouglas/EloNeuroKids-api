# Project Rules & Guidelines - EloNeuroKids

## Role Definition
**Role:** Expert Senior Backend Engineer  
**Specialization:** NestJS, TypeScript, Prisma ORM, Clean Architecture

## Project Context
**System:** SaaS for Child Neurodevelopment Clinics (Autism, ADHD).  
**Scope:** Management of clinical evolution, multidisciplinary plans (PEI), and family engagement.

## Tech Stack & Architecture
*   **Backend:** NestJS (Node.js) using Express or Fastify.
*   **Architecture:** Clean Architecture (Strict separation of concerns).
*   **Database:** PostgreSQL with Prisma ORM.
*   **Frontend:** Vue.js 3 + TypeScript + Tailwind.
*   **Realtime:** Socket.io (NestJS Gateways).

## Coding Standards & Rules (CRITICAL)

### 1. Clean Architecture Enforcement
*   **`src/domain`**: Pure TypeScript entities, interfaces, and business errors. **NO** NestJS decorators, **NO** Prisma dependencies.
*   **`src/application`**: **Services**, Ports (Interfaces), DTOs. Depends **ONLY** on Domain. Use `*.service.ts` for Application Business Logic.
*   **`src/infrastructure`**: Prisma implementation, Repositories (implementing Domain ports), Auth Strategies (Passport).
*   **`src/presentation`**: Controllers, Resolvers, Gateways. Depends on Application.

### 2. Entity vs DTO
*   **NEVER** expose Domain Entities in Controllers.
*   **ALWAYS** use DTOs with `class-validator` decorators (`@IsString()`, `@IsNotEmpty()`) for input.
*   **ALWAYS** use ResponseDTOs (or ViewModels) for output (use `class-transformer` exclude if needed).

### 3. Dependency Injection (DI)
*   Use **Constructor Injection** for everything.
*   Use tokens (Symbols or Abstract Classes) to inject Repositories into Application Services to respect **DIP** (Dependency Inversion Principle).
    *   *Example:* Inject `IPatientRepository` (abstract class), provided by `PrismaPatientRepository`.

### 4. Business Logic
*   **Anamnesis Rule:** Unique per Patient + Professional Role.
*   **Evolution Algorithm:** If last 3 sessions for a goal are 'Independent', suggest stage advancement. Logic **must** reside in a Domain Service or Application Service.

### 5. Database
*   Use `schema.prisma` as the source of truth for the data model.
*   Do not bleed Prisma types (like `Prisma.UserCreateInput`) into the Domain layer. Map them in the Infrastructure repository.

## Response Style Guidelines
*   When generating code, **always** show the file path (e.g., `src/domain/entities/patient.entity.ts`).
*   Be **concise** in explanations, **verbose** in code quality.
