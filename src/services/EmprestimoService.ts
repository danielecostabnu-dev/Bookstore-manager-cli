import { EmprestimoRepository } from "../repositories/EmprestimoRepository.js";
import { ClienteRepository } from "../repositories/ClienteRepository.js";
import { LivroRepository } from "../repositories/LivroRepository.js";

export class EmprestimoService {
    constructor(
    private emprestimoRepository: EmprestimoRepository,
    private clienteRepository: ClienteRepository,
    private livroRepository: LivroRepository        
    ) {}

    async listarTodos() {
        return await this.emprestimoRepository.listarTodos();
    }
    async listarAtrasados() {
        return await this.emprestimoRepository.listarAtrasados();
    }
    async clientePossuiAtraso(
    clienteId: number
) {
    return await this.emprestimoRepository.clientePossuiAtraso(
        clienteId
    );
}
async realizarEmprestimo(
    clienteId: number,
    livroId: number
) {
    const cliente =
        await this.clienteRepository.buscarPorId(
            clienteId
        );

    if (!cliente) {
        throw new Error("Cliente não encontrado");
    }

    const livro =
        await this.livroRepository.buscarPorId(
            livroId
        );

    if (!livro) {
        throw new Error("Livro não encontrado");
    }

    const possuiAtraso =
        await this.emprestimoRepository.clientePossuiAtraso(
            clienteId
        );

    if (possuiAtraso) {
        throw new Error(
            "Cliente possui empréstimos atrasados"
        );
    }

    if (livro.quantidadeDisponivel <= 0) {
        throw new Error(
            "Livro sem estoque disponível"
        );
    }

    const emprestimo =
        await this.emprestimoRepository.criar(
            livroId,
            clienteId
        );

    await this.livroRepository.atualizarQuantidade(
        livroId,
        livro.quantidadeDisponivel - 1
    );

    return emprestimo;
}
async realizarDevolucao(
    emprestimoId: number
) {
    const emprestimo =
        await this.emprestimoRepository.buscarPorId(
            emprestimoId
        );

    if (!emprestimo) {
        throw new Error("Empréstimo não encontrado");
    }

    if (emprestimo.status === "DEVOLVIDO") {
        throw new Error("Empréstimo já devolvido");
    }

    const livro =
        await this.livroRepository.buscarPorId(
            emprestimo.livroId
        );

    if (!livro) {
        throw new Error("Livro não encontrado");
    }

    await this.emprestimoRepository.devolver(
        emprestimoId
    );

    await this.livroRepository.atualizarQuantidade(
        livro.id,
        livro.quantidadeDisponivel + 1
    );

    return await this.emprestimoRepository.buscarPorId(
        emprestimoId
    );
}
}