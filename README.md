# Bookstore Manager CLI

Sistema de gerenciamento de biblioteca desenvolvido em Node.js, TypeScript e PostgreSQL como projeto final do curso de Back-End do SENAI.

## Objetivo

Desenvolver uma aplicação executada por linha de comando (CLI) para o gerenciamento de uma biblioteca, permitindo controlar autores, livros, clientes e empréstimos.

O projeto utiliza arquitetura em camadas, banco de dados PostgreSQL, programação orientada a objetos, programação assíncrona e boas práticas de desenvolvimento com TypeScript.

## Funcionalidades

- Listagem de livros;
- Listagem de clientes;
- Listagem de empréstimos;
- Listagem de empréstimos atrasados;
- Realização de empréstimos;
- Registro de devoluções;
- Controle da quantidade disponível dos livros;
- Validação da existência de clientes e livros;
- Bloqueio de empréstimos para clientes com registros atrasados;
- Bloqueio de empréstimos quando o livro não possui estoque;
- Bloqueio de devoluções duplicadas.

## Regras de negócio

- O cliente e o livro devem estar cadastrados para que o empréstimo seja realizado.
- Clientes com empréstimos atrasados não podem realizar novos empréstimos.
- Livros sem quantidade disponível não podem ser emprestados.
- Ao realizar um empréstimo, a quantidade disponível do livro é reduzida.
- Ao registrar uma devolução, a quantidade disponível do livro é aumentada.
- Um empréstimo já devolvido não pode ser devolvido novamente.

## Tecnologias utilizadas

- Node.js;
- TypeScript;
- PostgreSQL;
- Docker;
- biblioteca `pg`;
- Git;
- GitHub.

## Arquitetura

O projeto foi organizado utilizando arquitetura em camadas:

- **Models:** representam as entidades do sistema.
- **Repositories:** realizam o acesso e a persistência dos dados no PostgreSQL.
- **Services:** implementam as regras de negócio e validações.
- **Menus:** realizam a interação com o usuário pelo terminal.
- **Database:** centraliza a configuração da conexão com o banco de dados.

## Estrutura do projeto

```text
src/
├── controllers/
├── db/
│   └── connection.ts
├── menus/
│   └── MainMenu.ts
├── models/
│   ├── Autor.ts
│   ├── Cliente.ts
│   ├── Emprestimo.ts
│   └── Livro.ts
├── repositories/
│   ├── AutorRepository.ts
│   ├── ClienteRepository.ts
│   ├── EmprestimoRepository.ts
│   └── LivroRepository.ts
├── services/
│   ├── AutorService.ts
│   ├── ClienteService.ts
│   ├── EmprestimoService.ts
│   └── LivroService.ts
└── index.ts

sql/
├── schema.sql
└── seed.sql
```

## Pré-requisitos

Para executar o projeto, é necessário possuir:

- Node.js;
- npm;
- Docker;
- PostgreSQL ou um contêiner PostgreSQL;
- Git.

## Como executar

### 1. Clonar o projeto

```bash
git clone https://github.com/danielecostabnu-dev/Bookstore-manager-cli.git
```

### 2. Acessar a pasta do projeto

```bash
cd Bookstore-manager-cli
```

### 3. Instalar as dependências

```bash
npm install
```

### 4. Configurar as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto, seguindo as configurações utilizadas na conexão com o PostgreSQL.

Exemplo:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=sua_senha
DB_NAME=bookstore
```

O arquivo `.env` não deve ser enviado ao GitHub.

### 5. Iniciar o PostgreSQL

Utilizando Docker Compose:

```bash
docker-compose up -d
```

Caso o contêiner já tenha sido criado:

```bash
docker start bookstore-postgres
```

### 6. Criar a estrutura do banco

Execute o arquivo:

```text
sql/schema.sql
```

### 7. Popular o banco

Execute o arquivo:

```text
sql/seed.sql
```

### 8. Compilar o projeto

```bash
npx tsc
```

### 9. Executar a aplicação

```bash
node dist/index.js
```

## Menu da aplicação

Ao executar o sistema, será apresentado o seguinte menu:

```text
1 - Listar livros
2 - Listar clientes
3 - Listar empréstimos
4 - Listar empréstimos atrasados
5 - Realizar empréstimo
6 - Realizar devolução
0 - Sair
```

## Exemplos de validações

A aplicação apresenta mensagens claras em situações como:

- cliente não encontrado;
- livro não encontrado;
- livro sem estoque disponível;
- cliente com empréstimos atrasados;
- empréstimo não encontrado;
- empréstimo já devolvido;
- entrada inválida.

## Banco de dados

O banco de dados PostgreSQL utiliza tabelas relacionadas para armazenar:

- autores;
- livros;
- clientes;
- empréstimos.

Os relacionamentos foram implementados por meio de chaves primárias e estrangeiras.

Os scripts de criação e preenchimento do banco estão disponíveis na pasta `sql`.

## Versionamento

O projeto foi versionado com Git e GitHub, utilizando as seguintes branches:

- `main`;
- `develop`;
- `feat/autores`;
- `feat/livros`;
- `feat/clientes`;
- `feat/emprestimos`.

## Autora

Daniele Costa