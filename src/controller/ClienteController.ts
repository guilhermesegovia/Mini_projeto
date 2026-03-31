import { app } from "../server";
import { ClienteRepository } from "../repositories/ClienteRepository";

export function ClienteController() {
  const repository = new ClienteRepository();

  // 🔹 Listar todos ou buscar por nome
  app.get("/clientes", (req, res) => {
    try {
      const { nome } = req.query;

      if (nome) {
        const cliente = repository.buscarPorNome(nome as string);

        if (!cliente)
          return res.status(404).json({ erro: "Cliente não encontrado" });

        return res.json(cliente);
      }

      res.json(repository.listarClientes());
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Buscar por ID
  app.get("/clientes/:id", (req, res) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) throw new Error("ID inválido");

      const cliente = repository.buscarPorId(id);

      if (!cliente)
        return res.status(404).json({ erro: "Cliente não encontrado" });

      res.json(cliente);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Criar cliente
  app.post("/clientes", (req, res) => {
    try {
      const {
        nome,
        telefone,
        cpf,
        email,
        senha,
        endereco,
        cep,
        data_nascimento
      } = req.body;

      if (!nome || nome.trim().length === 0)
        throw new Error("Nome é obrigatório");

      if (!email || !email.includes("@"))
        throw new Error("Email inválido");

      if (!cpf || cpf.length < 11)
        throw new Error("CPF inválido");

      if (!senha || senha.length < 6)
        throw new Error("Senha deve ter pelo menos 6 caracteres");

      const cliente = repository.salvar({
        nome,
        telefone,
        cpf,
        email,
        senha,
        endereco,
        cep,
        data_nascimento
      });

      res.status(201).json(cliente);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Atualizar cliente
  app.put("/clientes/:id", (req, res) => {
    try {
      const id = Number(req.params.id);

      const {
        nome,
        telefone,
        cpf,
        email,
        senha,
        endereco,
        cep,
        data_nascimento
      } = req.body;

      if (isNaN(id)) throw new Error("ID inválido");

      if (!nome || nome.trim().length === 0)
        throw new Error("Nome é obrigatório");

      if (!email || !email.includes("@"))
        throw new Error("Email inválido");

      repository.AtulizarCliente(
        id,
        nome,
        telefone,
        cpf,
        email,
        senha,
        endereco,
        cep,
        data_nascimento
      );

      res.json({ mensagem: "Cliente atualizado com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Deletar cliente
  app.delete("/clientes/:id", (req, res) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) throw new Error("ID inválido");

      repository.DeletarCliente(id);

      res.json({ mensagem: "Cliente deletado com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}