import { pool } from "../db/connection.js";
import { Autor } from "../models/Autor.js";

export class AutorRepository {
    async listarTodos(): Promise<Autor[]> {
        const resultado = await pool.query(
            "SELECT * FROM autores ORDER BY nome"
        );

        return resultado.rows.map(
            (autor) =>
                new Autor(
                    autor.id,
                    autor.nome,
                    autor.nacionalidade
                )
        );
    }
    async buscarPorId(id: number): Promise<Autor | null> {
    const resultado = await pool.query(
        "SELECT * FROM autores WHERE id = $1",
        [id]
    );

    if (resultado.rows.length === 0) {
        return null;
    }

    const autor = resultado.rows[0];

    return new Autor(
        autor.id,
        autor.nome,
        autor.nacionalidade
    );
}

async criar(
    nome: string,
    nacionalidade: string
): Promise<Autor> {
    const resultado = await pool.query(
        `
        INSERT INTO autores (nome, nacionalidade)
        VALUES ($1, $2)
        RETURNING *
        `,
        [nome, nacionalidade]
    );

    const autor = resultado.rows[0];

    return new Autor(
        autor.id,
        autor.nome,
        autor.nacionalidade
    );
}

async atualizar(
    id: number,
    nome: string,
    nacionalidade: string
): Promise<Autor | null> {
    const resultado = await pool.query(
        `
        UPDATE autores
        SET nome = $1,
            nacionalidade = $2
        WHERE id = $3
        RETURNING *
        `,
        [nome, nacionalidade, id]
    );

    if (resultado.rows.length === 0) {
        return null;
    }

    const autor = resultado.rows[0];

    return new Autor(
        autor.id,
        autor.nome,
        autor.nacionalidade
    );
}

async remover(id: number): Promise<boolean> {
    const resultado = await pool.query(
        "DELETE FROM autores WHERE id = $1",
        [id]
    );

    return resultado.rowCount !== null && resultado.rowCount > 0;
}
}