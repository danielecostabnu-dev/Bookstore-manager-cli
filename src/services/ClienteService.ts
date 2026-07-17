import { ClienteRepository } from "../repositories/ClienteRepository.js";
import { Cliente } from "../models/Cliente.js";

export class ClienteService {
    constructor(
        private clienteRepository: ClienteRepository
    ) {}

    async listarTodos(): Promise<Cliente[]> {
        return await this.clienteRepository.listarTodos();
    }

    async buscarPorId(id: number): Promise<Cliente | null> {
        return await this.clienteRepository.buscarPorId(id);
    }

    async criar(
        nome: string,
        email: string,
        telefone: string
    ): Promise<Cliente> {
        if (!nome.trim()) {
            throw new Error("O nome do cliente é obrigatório.");
        }

        if (!email.trim()) {
            throw new Error("O e-mail do cliente é obrigatório.");
        }

        if (!telefone.trim()) {
            throw new Error("O telefone do cliente é obrigatório.");
        }

        return await this.clienteRepository.criar(
            nome,
            email,
            telefone
        );
    }

    async atualizar(
        id: number,
        nome: string,
        email: string,
        telefone: string
    ): Promise<Cliente> {
        if (!nome.trim()) {
            throw new Error("O nome do cliente é obrigatório.");
        }

        if (!email.trim()) {
            throw new Error("O e-mail do cliente é obrigatório.");
        }

        if (!telefone.trim()) {
            throw new Error("O telefone do cliente é obrigatório.");
        }

        const cliente = await this.clienteRepository.atualizar(
            id,
            nome,
            email,
            telefone
        );

        if (!cliente) {
            throw new Error("Cliente não encontrado.");
        }

        return cliente;
    }

    async remover(id: number): Promise<void> {
        const removido = await this.clienteRepository.remover(id);

        if (!removido) {
            throw new Error("Cliente não encontrado.");
        }
    }
}