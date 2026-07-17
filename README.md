# Bookstore Manager CLI

Sistema de gerenciamento de biblioteca desenvolvido em Node.js, TypeScript e PostgreSQL.

## Funcionalidades

- Listar livros
- Listar clientes
- Listar empréstimos
- Listar empréstimos atrasados
- Realizar empréstimos
- Realizar devoluções
- Controle de disponibilidade dos livros
- Validação de clientes com empréstimos atrasados

## Tecnologias Utilizadas

- Node.js
- TypeScript
- PostgreSQL
- Docker
- pg

## Estrutura do Projeto

```
src/
├── db
├── menus
├── models
├── repositories
├── services
└── index.ts

sql/
├── schema.sql
└── seed.sql
```

## Como executar

### 1. Clonar o projeto

```bash
git clone <url-do-repositorio>
```

### 2. Instalar dependências

```bash
npm install
```

### 3. Subir PostgreSQL

```bash
docker start bookstore-postgres
```

ou

```bash
docker-compose up -d
```

### 4. Criar banco de dados

Executar:

```sql
sql/schema.sql
```

### 5. Popular banco

Executar:

```sql
sql/seed.sql
```

### 6. Compilar

```bash
npx tsc
```

### 7. Executar

```bash
node dist/index.js
```

## Autor

Daniele Costa