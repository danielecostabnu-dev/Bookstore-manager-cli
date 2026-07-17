INSERT INTO autores (nome, nacionalidade)
VALUES
('Robert C. Martin', 'Estados Unidos'),
('Martin Fowler', 'Reino Unido'),
('Eric Evans', 'Estados Unidos'),
('Kent Beck', 'Estados Unidos'),
('Steve McConnell', 'Estados Unidos'),
('Andrew Hunt', 'Estados Unidos');

INSERT INTO clientes (nome, email, telefone)
VALUES
('Daniele Costa', 'daniele@email.com', '47999990001'),
('Joao Silva', 'joao@email.com', '47999990002'),
('Maria Souza', 'maria@email.com', '47999990003'),
('Ana Pereira', 'ana@email.com', '47999990004'),
('Carlos Lima', 'carlos@email.com', '47999990005'),
('Fernanda Alves', 'fernanda@email.com', '47999990006'),
('Bruno Martins', 'bruno@email.com', '47999990007'),
('Juliana Rocha', 'juliana@email.com', '47999990008');

INSERT INTO livros (
    titulo,
    isbn,
    ano_publicacao,
    quantidade_disponivel,
    autor_id
)
VALUES
('Clean Code', '9780132350884', 2008, 5, 1),
('Clean Architecture', '9780134494166', 2017, 3, 1),
('Refactoring', '9780201485677', 1999, 4, 2),
('Patterns of Enterprise Application Architecture', '9780321127426', 2002, 2, 2),
('Domain Driven Design', '9780321125217', 2003, 2, 3),
('TDD By Example', '9780321146533', 2002, 3, 4),
('Extreme Programming Explained', '9780201616415', 1999, 1, 4),
('Code Complete', '9780735619678', 2004, 4, 5),
('The Pragmatic Programmer', '9780201616224', 1999, 5, 6),
('Pragmatic Thinking and Learning', '9781934356050', 2008, 2, 6);

INSERT INTO emprestimos (
    livro_id,
    cliente_id,
    data_emprestimo,
    data_devolucao,
    status
)
VALUES
(1, 1, CURRENT_DATE, NULL, 'EMPRESTADO'),
(2, 2, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE, 'DEVOLVIDO'),
(3, 3, CURRENT_DATE - INTERVAL '20 days', NULL, 'ATRASADO'),
(4, 4, CURRENT_DATE - INTERVAL '2 days', NULL, 'EMPRESTADO');