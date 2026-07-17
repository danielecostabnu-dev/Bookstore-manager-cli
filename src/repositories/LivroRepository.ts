import { pool } from "../db/connection.js";
import { Livro } from "../models/Livro.js";

export class LivroRepository {
    async listarTodos(): Promise<Livro[]> {
        const resultado = await pool.query(
            "SELECT * FROM livros ORDER BY titulo"
        );

        return resultado.rows.map(
            (livro) =>
                new Livro(
                    livro.id,
                    livro.titulo,
                    livro.isbn,
                    livro.ano_publicacao,
                    livro.quantidade_disponivel,
                    livro.autor_id
                )
        );
    }
    async buscarPorId(id: number): Promise<Livro | null> {
    const resultado = await pool.query(
        "SELECT * FROM livros WHERE id = $1",
        [id]
    );

    if (resultado.rows.length === 0) {
        return null;
    }

    const livro = resultado.rows[0];

    return new Livro(
        livro.id,
        livro.titulo,
        livro.isbn,
        livro.ano_publicacao,
        livro.quantidade_disponivel,
        livro.autor_id
    );
}
async atualizarQuantidade(
    id: number,
    quantidade: number
): Promise<void> {
    await pool.query(
        "UPDATE livros SET quantidade_disponivel = $1 WHERE id = $2",
        [quantidade, id]
    );
}
}