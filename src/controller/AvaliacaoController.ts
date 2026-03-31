import { app } from "../server";
import { AvaliacaoRepository } from "../repositories/AvaliacaoRepository";

export function AvaliacaoController() {
  const repository = new AvaliacaoRepository();

  // 🔹 Listar todas avaliações ou por produto
  app.get("/avaliacoes", (req, res) => {
    const { id_produto } = req.query;

    if (id_produto) {
      const avaliacoes = repository.listarAvaliacoesPorProduto(Number(id_produto));
      return res.json(avaliacoes);
    }

    res.json(repository.listarAvaliacoes());
  });

  // 🔹 Criar avaliação
  app.post("/avaliacoes", (req, res) => {
    try {
      const { comentario, estrelas } = req.body;

      if (!comentario || comentario.trim().length === 0)
        throw new Error("Comentário é obrigatório");

      if (estrelas === undefined || estrelas < 1 || estrelas > 5)
        throw new Error("Estrelas devem ser entre 1 e 5");

      const avaliacao = repository.salvar({ comentario, estrelas });
      res.status(201).json(avaliacao);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Deletar avaliação
  app.delete("/avaliacoes/:id", (req, res) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) throw new Error("ID inválido");

      repository.DeletarAvaliacao(id);

      res.json({ mensagem: "Avaliação deletada com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}