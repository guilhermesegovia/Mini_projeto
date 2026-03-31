import { app } from "../server";
import { CategoriaRepository } from "../repositories/CategoriaRepository";

export function CategoriaController() {
  const repository = new CategoriaRepository();

  // 🔹 Listar todas ou buscar por nome
  app.get("/categorias", (req, res) => {
    try {
      const { nome } = req.query;

      if (nome) {
        const categoria = repository.buscarPorNome(nome as string);

        if (!categoria)
          return res.status(404).json({ erro: "Categoria não encontrada" });

        return res.json(categoria);
      }

      res.json(repository.listarCategorias());
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Criar categoria
  app.post("/categorias", (req, res) => {
    try {
      const { nome, descricao } = req.body;

      if (!nome || nome.trim().length === 0)
        throw new Error("Nome é obrigatório");

      if (!descricao || descricao.trim().length === 0)
        throw new Error("Descrição é obrigatória");

      const categoria = repository.salvar({ nome, descricao });

      res.status(201).json(categoria);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Atualizar categoria
  app.put("/categorias/:id", (req, res) => {
    try {
      const id = Number(req.params.id);
      const { nome, descricao } = req.body;

      if (isNaN(id)) throw new Error("ID inválido");

      if (!nome || nome.trim().length === 0)
        throw new Error("Nome é obrigatório");

      if (!descricao || descricao.trim().length === 0)
        throw new Error("Descrição é obrigatória");

      repository.AtualizarCategoria(id, nome, descricao);

      res.json({ mensagem: "Categoria atualizada com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Deletar categoria
  app.delete("/categorias/:id", (req, res) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) throw new Error("ID inválido");

      repository.DeletarCategoria(id);

      res.json({ mensagem: "Categoria deletada com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}