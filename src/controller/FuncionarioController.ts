import { app } from "../server";
import { FuncionarioRepository } from "../repositories/FuncionarioRepository";

export function FuncionarioController() {
  const repository = new FuncionarioRepository();

  // Listar todos ou buscar por nome
  app.get("/funcionarios", (req, res) => {
    const { nome } = req.query;

    if (nome) {
      const funcionario = repository.buscarPorNome(nome as string);
      if (!funcionario) {
        return res.status(404).json({ erro: "Funcionário não encontrado" });
      }
      return res.json(funcionario);
    }

    res.json(repository.listarFuncionarios());
  });

  // Buscar por ID
  app.get("/funcionarios/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const funcionario = repository.buscarPorId(id);

    if (!funcionario) {
      return res.status(404).json({ erro: "Funcionário não encontrado" });
    }

    res.json(funcionario);
  });

  // Criar funcionário
  app.post("/funcionarios", (req, res) => {
    try {
      const { nome, setor, cargo, data_nascimento, cpf, email } = req.body;

      if (!nome || nome.trim().length === 0) {
        throw new Error("Nome é obrigatório");
      }

      if (!cpf || cpf.trim().length === 0) {
        throw new Error("CPF é obrigatório");
      }

      if (!email || !email.includes("@")) {
        throw new Error("Email inválido");
      }

      const funcionario = repository.salvar({
        nome,
        setor,
        cargo,
        data_nascimento,
        cpf,
        email,
      });

      res.status(201).json(funcionario);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // Atualizar funcionário
  app.put("/funcionarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const { nome, setor, cargo, data_nascimento, cpf, email } = req.body;

      const funcionario = repository.buscarPorId(id);
      if (!funcionario) {
        return res.status(404).json({ erro: "Funcionário não encontrado" });
      }

      repository.AtualizarFuncionario(
        id,
        nome,
        setor,
        cargo,
        data_nascimento,
        cpf,
        email
      );

      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: "Erro ao atualizar funcionário" });
    }
  });

  // Deletar funcionário
  app.delete("/funcionarios/:id", (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const funcionario = repository.buscarPorId(id);

      if (!funcionario) {
        return res.status(404).json({ erro: "Funcionário não encontrado" });
      }

      repository.DeletarFuncionario(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar funcionário" });
    }
  });
}