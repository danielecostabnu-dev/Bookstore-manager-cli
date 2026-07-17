export class Livro {
    constructor(
        public id: number,
        public titulo: string,
        public isbn: string,
        public anoPublicacao: number,
        public quantidadeDisponivel: number,
        public autorId: number
    ) {}
}