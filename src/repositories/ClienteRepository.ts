import { pool } from "../db/connection.js";
import { Cliente } from "../models/Cliente.js";

export class ClienteRepository {
    async listarTodos(): Promise<Cliente[]> {
        const resultado = await pool.query(
            "SELECT * FROM clientes ORDER BY nome"
        );

        return resultado.rows.map(
            (cliente) =>
                new Cliente(
                    cliente.id,
                    cliente.nome,
                    cliente.email,
                    cliente.telefone
                )
        );
    }
    async buscarPorId(id: number): Promise<Cliente | null> {
    const resultado = await pool.query(
        "SELECT * FROM clientes WHERE id = $1",
        [id]
    );

    if (resultado.rows.length === 0) {
        return null;
    }

    const cliente = resultado.rows[0];

    return new Cliente(
        cliente.id,
        cliente.nome,
        cliente.email,
        cliente.telefone
    );
}
async criar(
    nome: string,
    email: string,
    telefone: string
): Promise<Cliente> {
    const resultado = await pool.query(
        `
        INSERT INTO clientes (nome, email, telefone)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [nome, email, telefone]
    );

    const cliente = resultado.rows[0];

    return new Cliente(
        cliente.id,
        cliente.nome,
        cliente.email,
        cliente.telefone
    );
}

async atualizar(
    id: number,
    nome: string,
    email: string,
    telefone: string
): Promise<Cliente | null> {
    const resultado = await pool.query(
        `
        UPDATE clientes
        SET nome = $1,
            email = $2,
            telefone = $3
        WHERE id = $4
        RETURNING *
        `,
        [nome, email, telefone, id]
    );

    if (resultado.rows.length === 0) {
        return null;
    }

    const cliente = resultado.rows[0];

    return new Cliente(
        cliente.id,
        cliente.nome,
        cliente.email,
        cliente.telefone
    );
}

async remover(id: number): Promise<boolean> {
    const resultado = await pool.query(
        "DELETE FROM clientes WHERE id = $1",
        [id]
    );

    return resultado.rowCount !== null && resultado.rowCount > 0;
}
}