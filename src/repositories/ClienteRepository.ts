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
}