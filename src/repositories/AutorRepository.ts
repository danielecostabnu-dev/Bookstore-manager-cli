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
}