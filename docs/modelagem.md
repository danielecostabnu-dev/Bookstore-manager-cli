# Modelagem do Banco de Dados

## Tabela: autores

| Campo | Tipo | Observação |
|---------|---------|---------|
| id | SERIAL | PK |
| nome | VARCHAR(150) | Obrigatório |
| nacionalidade | VARCHAR(100) | Opcional |

---

## Tabela: livros

| Campo | Tipo | Observação |
|---------|---------|---------|
| id | SERIAL | PK |
| titulo | VARCHAR(200) | Obrigatório |
| isbn | VARCHAR(20) | UNIQUE |
| ano_publicacao | INTEGER | Obrigatório |
| quantidade_disponivel | INTEGER | >= 0 |
| autor_id | INTEGER | FK autores |

---

## Tabela: clientes

| Campo | Tipo | Observação |
|---------|---------|---------|
| id | SERIAL | PK |
| nome | VARCHAR(150) | Obrigatório |
| email | VARCHAR(150) | UNIQUE |
| telefone | VARCHAR(20) | Opcional |

---

## Tabela: emprestimos

| Campo | Tipo | Observação |
|---------|---------|---------|
| id | SERIAL | PK |
| livro_id | INTEGER | FK livros |
| cliente_id | INTEGER | FK clientes |
| data_emprestimo | DATE | Obrigatório |
| data_devolucao | DATE | Opcional |
| status | VARCHAR(20) | EMPRESTADO / DEVOLVIDO |
## Relacionamentos

```text
AUTOR
  |
  | 1:N
  |
LIVRO
  |
  | 1:N
  |
EMPRESTIMO
  |
  | N:1
  |
CLIENTE
```