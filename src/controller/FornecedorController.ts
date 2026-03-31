import { app } from "../server";
import { FornecedorRepository } from "../repositories/FornecedorRepository";

export function FornecedorController() {
  const repository = new FornecedorRepository();

  // Listar todos ou buscar por nome
  app.get("/fornecedores", (req, res) => {
    const { nome } = req.query;

    if (nome) {
      const fornecedor = repository.BuscarPorNome(nome as string);
      if (!fornecedor) {
        return res.status(404).json({ erro: "Fornecedor não encontrado" });
      }
      return res.json(fornecedor);
    }

    res.json(repository.listarForncedor());
  });

  // Buscar por ID
  app.get("/fornecedores/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const fornecedor = repository.BuscarPorId(id);

    if (!fornecedor) {
      return res.status(404).json({ erro: "Fornecedor não encontrado" });
    }

    res.json(fornecedor);
  });

  // Criar fornecedor
  app.post("/fornecedores", (req, res) => {
    try {
      const { nome_empresa, cnpj } = req.body;

      if (!nome_empresa || nome_empresa.trim().length === 0) {
        throw new Error("Nome da empresa é obrigatório");
      }

      if (!cnpj || cnpj.trim().length === 0) {
        throw new Error("CNPJ é obrigatório");
      }

      const fornecedor = repository.salvar({ nome_empresa, cnpj });
      res.status(201).json(fornecedor);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // Deletar fornecedor
  app.delete("/fornecedores/:id", (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const fornecedor = repository.BuscarPorId(id);

      if (!fornecedor) {
        return res.status(404).json({ erro: "Fornecedor não encontrado" });
      }

      repository.DeletarFornecedor(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar fornecedor" });
    }
  });
}
