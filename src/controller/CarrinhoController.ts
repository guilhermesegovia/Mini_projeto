import { app } from "../server";
import { CarrinhoRepository } from "../repositories/CarrinhoRepository";

export function CarrinhoController() {
  const repository = new CarrinhoRepository();

  // 🔹 Ver carrinho de um cliente
  app.get("/carrinho/:id_cliente", (req, res) => {
    try {
      const id_cliente = Number(req.params.id_cliente);

      if (isNaN(id_cliente)) throw new Error("ID do cliente inválido");

      const carrinho = repository.Vercarrinho(id_cliente);
      res.json(carrinho);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Adicionar ao carrinho
  app.post("/carrinho", (req, res) => {
    try {
      const { id_cliente, id_produto, quantidade } = req.body;

      if (!id_cliente || !id_produto)
        throw new Error("ID do cliente e produto são obrigatórios");

      if (!quantidade || quantidade <= 0)
        throw new Error("Quantidade inválida");

      repository.adicionaraocarrinho(id_cliente, id_produto, quantidade);

      res.status(201).json({ mensagem: "Produto adicionado ao carrinho" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Atualizar quantidade
  app.put("/carrinho", (req, res) => {
    try {
      const { id_cliente, id_produto, quantidade } = req.body;

      if (!id_cliente || !id_produto)
        throw new Error("ID do cliente e produto são obrigatórios");

      if (quantidade === undefined || quantidade < 0)
        throw new Error("Quantidade inválida");

      repository.AtualizarQuantidade(id_cliente, id_produto, quantidade);

      res.json({ mensagem: "Quantidade atualizada com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Remover item específico
  app.delete("/carrinho/item", (req, res) => {
    try {
      const { id_cliente, id_produto } = req.body;

      if (!id_cliente || !id_produto)
        throw new Error("ID do cliente e produto são obrigatórios");

      repository.RemoverDoCarrinho(id_cliente, id_produto);

      res.json({ mensagem: "Item removido do carrinho" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Limpar carrinho
  app.delete("/carrinho/:id_cliente", (req, res) => {
    try {
      const id_cliente = Number(req.params.id_cliente);

      if (isNaN(id_cliente)) throw new Error("ID inválido");

      repository.LimparCarrinho(id_cliente);

      res.json({ mensagem: "Carrinho limpo com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}