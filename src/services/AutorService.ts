import { AutorRepository } from "../repositories/AutorRepository.js";
import { Autor } from "../models/Autor.js";

export class AutorService {
    constructor(
        private autorRepository: AutorRepository
    ) {}

    async listarTodos(): Promise<Autor[]> {
        return await this.autorRepository.listarTodos();
    }

    async buscarPorId(id: number): Promise<Autor | null> {
        return await this.autorRepository.buscarPorId(id);
    }

    async criar(
        nome: string,
        nacionalidade: string
    ): Promise<Autor> {
        if (!nome.trim()) {
            throw new Error("O nome do autor é obrigatório.");
        }

        if (!nacionalidade.trim()) {
            throw new Error("A nacionalidade é obrigatória.");
        }

        return await this.autorRepository.criar(
            nome,
            nacionalidade
        );
    }

    async atualizar(
        id: number,
        nome: string,
        nacionalidade: string
    ): Promise<Autor> {
        const autor = await this.autorRepository.atualizar(
            id,
            nome,
            nacionalidade
        );

        if (!autor) {
            throw new Error("Autor não encontrado.");
        }

        return autor;
    }

    async remover(id: number): Promise<void> {
        const removido = await this.autorRepository.remover(id);

        if (!removido) {
            throw new Error("Autor não encontrado.");
        }
    }
}