# EloNeuroKids API 🧠💙

> **Sistema de Gestão para Clínicas de Neurodesenvolvimento Infantil (TEA, TDAH)**

Bem-vindo ao repositório do backend da **EloNeuroKids**. Esta é uma API robusta, construída com **NestJS**, focada em gerenciar a evolução clínica de crianças atípicas, planos terapêuticos multidisciplinares (PEI) e engajamento familiar.

---

## 🏗️ Arquitetura e Stack

O projeto segue rigorosamente os princípios de **Clean Architecture** para garantir escalabilidade, testabilidade e desacoplamento.

*   **Runtime:** Node.js (v20+)
*   **Framework:** NestJS
*   **Linguagem:** TypeScript
*   **Banco de Dados:** PostgreSQL 15+
*   **ORM:** Prisma ORM
*   **Autenticação:** JWT (Passport) + RBAC (Role-Based Access Control)
*   **Testes:** Jest (Unitários e E2E)
*   **Documentação:** Swagger (OpenAPI)

### 🧩 Diagrama de Entidade-Relacionamento (ER)

O modelo de dados foi desenhado para suportar múltiplos profissionais atuando sobre o mesmo paciente, com controle estrito de acessos e evolução de metas.

```mermaid
erDiagram
    %% --- IDENTITY (AUTENTICAÇÃO) ---
    Users {
        string Id "PK - Guid"
        string Email
        string PasswordHash
        string Name
    }
    Roles {
        string Id "PK - Guid"
        string Name "Ex: Fonoaudiólogo, Psicólogo, Admin"
    }
    UserRoles {
        string UserId "FK"
        string RoleId "FK"
    }

    %% --- ANAMNESE ---
    ANAMNESIS {
        uuid Id "PK"
        uuid PatientId "FK"
        string RoleId "FK (Cargo que preencheu)"
        text HealthHistory
        text SocialHistory
    }

    %% --- PACIENTE E PEI ---
    PATIENTS {
        uuid Id "PK"
        string Name
        date BirthDate
        string Diagnosis
        bool IsActive
    }
    PEIS {
        uuid Id "PK"
        uuid PatientId "FK"
        string Status "ACTIVE | ARCHIVED"
    }
    PEI_GOALS {
        uuid Id "PK"
        uuid PeiId "FK"
        string Title "Meta"
    }

    %% --- EXECUÇÃO DIÁRIA ---
    SESSIONS {
        uuid Id "PK"
        uuid PatientId "FK"
        string ProfessionalId "FK - Users.Id"
        datetime Date
        int Mood
    }
    SESSION_GOAL_ENTRIES {
        uuid Id "PK"
        uuid SessionId "FK"
        uuid PeiGoalId "FK"
        int SupportLevel "Nível de Ajuda"
        bool MilestoneReached
    }

    %% RELACIONAMENTOS
    Users ||--o{ UserRoles : "tem"
    Roles ||--o{ UserRoles : "atribuída a"
    PATIENTS ||--o{ ANAMNESIS : "tem fichas"
    Roles ||--o{ ANAMNESIS : "categoriza ficha"
    PATIENTS ||--o{ PEIS : "possui"
    PEIS ||--o{ PEI_GOALS : "contém"
    PATIENTS ||--o{ SESSIONS : "realiza"
    Users ||--o{ SESSIONS : "conduz"
    SESSIONS ||--o{ SESSION_GOAL_ENTRIES : "registra"
    PEI_GOALS ||--o{ SESSION_GOAL_ENTRIES : "evolui"
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
*   Node.js (v20+)
*   Docker & Docker Compose (para banco de dados)
*   Yarn (recomendado) ou NPM

### Passo a Passo

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/akyladouglas/EloNeuroKids-api.git
    cd EloNeuroKids-api
    ```

2.  **Instale as dependências:**
    ```bash
    yarn install
    ```

3.  **Configure o Banco de Dados:**
    Crie um arquivo `.env` na raiz (baseado no exemplo abaixo) e suba o container do Postgres:
    ```bash
    # Exemplo de .env
    DATABASE_URL="postgresql://admin:password123@localhost:5432/eloneurokids_db?schema=public"
    JWT_SECRET="segredo_desenvolvimento"
    JWT_EXPIRES_IN="7d"
    ```
    
    Suba o Docker:
    ```bash
    docker-compose up -d
    ```

4.  **Execute as Migrations e Seed:**
    Isso criará as tabelas e o usuário admin padrão (`admin@eloneurokids.com` / `password123`).
    ```bash
    npx prisma migrate dev --name init
    npx prisma db seed
    ```

5.  **Inicie a API:**
    ```bash
    yarn run start:dev
    ```

6.  **Acesse a Documentação:**
    Abra seu navegador em: 👉 **http://localhost:3000/api**

---

## 🧪 Testes

O projeto possui uma suíte de testes robusta.

*   **Testes Unitários:** Focados em Services e Controllers, com mocks isolados.
    ```bash
    yarn run test
    ```
*   **Testes de Integração (E2E):** Validam o fluxo completo (Auth -> CRUD -> DB).
    ```bash
    yarn run test:e2e
    ```

---

## 📂 Estrutura de Pastas (Clean Arch)

```
src/
├── application/       # Regras de Negócio
│   ├── dtos/          # Objetos de Transferência de Dados
│   └── services/      # Casos de Uso e Lógica (ex: PatientService)
├── domain/            # Núcleo da Aplicação
│   ├── entities/      # Entidades Puras (sem dependência de framework)
│   └── repositories/  # Interfaces (Contratos)
├── infrastructure/    # Implementação Técnica
│   ├── prisma/        # Configuração do ORM
│   └── repositories/  # Implementação dos Repositórios (Prisma)
├── presentation/      # Camada de Entrada
│   ├── auth/          # Módulo de Autenticação
│   ├── controllers/   # Controladores REST
│   └── ...
└── main.ts            # Ponto de Entrada (Bootstrap)
```

---

## 🛡️ Regras de Negócio Importantes

1.  **Anamnese Única por Cargo:** Um paciente só pode ter **uma** anamnese ativa por tipo de profissional (ex: 1 de Fonoaudiologia, 1 de Psicologia).
2.  **Evolução Automatizada:** O sistema sugere mudança de fase no PEI se a criança atingir "Independente" em 3 sessões consecutivas.
3.  **Segurança:** Apenas usuários autenticados e com permissões adequadas podem acessar dados sensíveis dos pacientes.

---

## 🤝 Contribuição

1.  Faça um fork do projeto.
2.  Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3.  Commit suas mudanças (`git commit -m 'feat: adiciona nova feature'`).
4.  Push para a branch (`git push origin feature/nova-feature`).
5.  Abra um Pull Request.

---

<p align="center">
  Feito com 💙 por <strong>Akyla Douglas</strong>
</p>
