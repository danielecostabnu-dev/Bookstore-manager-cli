import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { AutorRepository } from "../repositories/AutorRepository.js";
import { LivroRepository } from "../repositories/LivroRepository.js";
import { ClienteRepository } from "../repositories/ClienteRepository.js";
import { EmprestimoRepository } from "../repositories/EmprestimoRepository.js";

import { LivroService } from "../services/LivroService.js";
import { ClienteService } from "../services/ClienteService.js";
import { EmprestimoService } from "../services/EmprestimoService.js";
export class MainMenu {
    private leitor = createInterface({
        input,
        output
    });
    private livroService: LivroService;
private clienteService: ClienteService;
private emprestimoService: EmprestimoService;

constructor() {
    const autorRepository = new AutorRepository();
    const livroRepository = new LivroRepository();
    const clienteRepository = new ClienteRepository();
    const emprestimoRepository = new EmprestimoRepository();

   this.livroService = new LivroService(
    livroRepository
);

    this.clienteService = new ClienteService(
        clienteRepository
    );

    this.emprestimoService = new EmprestimoService(
        emprestimoRepository,
        clienteRepository,
        livroRepository
    );
}

  async exibir(): Promise<void> {
    let executando = true;

    while (executando) {
        console.log("\n==============================");
        console.log("     BOOKSTORE MANAGER");
        console.log("==============================");
        console.log("1 - Listar livros");
        console.log("2 - Listar clientes");
        console.log("3 - Listar empréstimos");
        console.log("4 - Listar empréstimos atrasados");
        console.log("5 - Realizar empréstimo");
        console.log("6 - Realizar devolução");
        console.log("0 - Sair");

        const opcao = await this.leitor.question(
            "\nEscolha uma opção: "
        );

        switch (opcao) {
            case "1": {
                const livros =
                    await this.livroService.listarTodos();

                console.log("\nLivros cadastrados:");
                console.table(livros);
                break;
            }

            case "2": {
                const clientes =
                    await this.clienteService.listarTodos();

                console.log("\nClientes cadastrados:");
                console.table(clientes);
                break;
            }

            case "3": {
                const emprestimos =
                    await this.emprestimoService.listarTodos();

                console.log("\nEmpréstimos cadastrados:");
                console.table(emprestimos);
                break;
            }

            case "4": {
                const atrasados =
                    await this.emprestimoService.listarAtrasados();

                console.log("\nEmpréstimos atrasados:");
                console.table(atrasados);
                break;
            }

            case "5": {
                const clienteId = Number(
                    await this.leitor.question(
                        "Informe o ID do cliente: "
                    )
                );

                const livroId = Number(
                    await this.leitor.question(
                        "Informe o ID do livro: "
                    )
                );

                try {
                    const emprestimo =
                        await this.emprestimoService.realizarEmprestimo(
                            clienteId,
                            livroId
                        );

                    console.log(
                        "\nEmpréstimo realizado com sucesso:"
                    );
                    console.table([emprestimo]);
                } catch (erro) {
                    if (erro instanceof Error) {
                        console.log(
                            "\nNão foi possível realizar o empréstimo:"
                        );
                        console.log(erro.message);
                    }
                }

                break;
            }

            case "6": {
                const emprestimoId = Number(
                    await this.leitor.question(
                        "Informe o ID do empréstimo: "
                    )
                );

                try {
                    const devolucao =
                        await this.emprestimoService.realizarDevolucao(
                            emprestimoId
                        );

                    console.log(
                        "\nDevolução realizada com sucesso:"
                    );
                    console.table(
                        devolucao ? [devolucao] : []
                    );
                } catch (erro) {
                    if (erro instanceof Error) {
                        console.log(
                            "\nNão foi possível realizar a devolução:"
                        );
                        console.log(erro.message);
                    }
                }

                break;
            }

            case "0":
                console.log("\nEncerrando sistema...");
                executando = false;
                break;

            default:
                console.log("\nOpção inválida.");
        }
    }

    this.leitor.close();
} 
}