import { LivroRepository } from "../repositories/LivroRepository.js";

export class LivroService {

    constructor(
        private livroRepository: LivroRepository
    ) {}

    async listarTodos() {
        return await this.livroRepository.listarTodos();
    }

    async buscarPorId(id: number) {
        return await this.livroRepository.buscarPorId(id);
    }
async atualizarQuantidade(
    id: number,
    quantidade: number
) {
    await this.livroRepository.atualizarQuantidade(
        id,
        quantidade
    );
}

}