import { ClienteRepository } from "../repositories/ClienteRepository.js";

export class ClienteService {
    constructor(
        private clienteRepository: ClienteRepository
    ) {}

    async listarTodos() {
        return await this.clienteRepository.listarTodos();
    }

    async buscarPorId(id: number) {
        return await this.clienteRepository.buscarPorId(id);
    }
}