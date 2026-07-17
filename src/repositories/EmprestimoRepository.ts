import { pool } from "../db/connection.js";
import { Emprestimo } from "../models/Emprestimo.js";

export class EmprestimoRepository {
    async listarTodos(): Promise<Emprestimo[]> {
        const resultado = await pool.query(
            "SELECT * FROM emprestimos ORDER BY id"
        );

        return resultado.rows.map(
            (emprestimo) =>
                new Emprestimo(
                    emprestimo.id,
                    emprestimo.livro_id,
                    emprestimo.cliente_id,
                    emprestimo.data_emprestimo,
                    emprestimo.data_devolucao,
                    emprestimo.status
                    
                )
        );
        
        
    }
    async listarAtrasados(): Promise<Emprestimo[]> {
    const resultado = await pool.query(
        "SELECT * FROM emprestimos WHERE status = 'ATRASADO'"
    );

    return resultado.rows.map(
        (emprestimo) =>
            new Emprestimo(
                emprestimo.id,
                emprestimo.livro_id,
                emprestimo.cliente_id,
                emprestimo.data_emprestimo,
                emprestimo.data_devolucao,
                emprestimo.status
            )
    );
}
async clientePossuiAtraso(
    clienteId: number
): Promise<boolean> {
    const resultado = await pool.query(
        "SELECT * FROM emprestimos WHERE cliente_id = $1 AND status = 'ATRASADO'",
        [clienteId]
    );

    return resultado.rows.length > 0;
}
async criar(
    livroId: number,
    clienteId: number
): Promise<Emprestimo> {
    const resultado = await pool.query(
        `INSERT INTO emprestimos (
            livro_id,
            cliente_id,
            data_emprestimo,
            data_devolucao,
            status
        )
        VALUES ($1, $2, CURRENT_DATE, NULL, 'EMPRESTADO')
        RETURNING *`,
        [livroId, clienteId]
    );

    const emprestimo = resultado.rows[0];

    return new Emprestimo(
        emprestimo.id,
        emprestimo.livro_id,
        emprestimo.cliente_id,
        emprestimo.data_emprestimo,
        emprestimo.data_devolucao,
        emprestimo.status
    );
}
async buscarPorId(
    id: number
): Promise<Emprestimo | null> {

    const resultado = await pool.query(
        "SELECT * FROM emprestimos WHERE id = $1",
        [id]
    );

    if (resultado.rows.length === 0) {
        return null;
    }

    const emprestimo = resultado.rows[0];

    return new Emprestimo(
        emprestimo.id,
        emprestimo.livro_id,
        emprestimo.cliente_id,
        emprestimo.data_emprestimo,
        emprestimo.data_devolucao,
        emprestimo.status
    );
}
async devolver(
    id: number
): Promise<void> {

    await pool.query(
        `
        UPDATE emprestimos
        SET
            status = 'DEVOLVIDO',
            data_devolucao = CURRENT_DATE
        WHERE id = $1
        `,
        [id]
    );
}
}