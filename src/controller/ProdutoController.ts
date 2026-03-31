import { app } from "../server";
import { ProdutoRepository } from "../repositories/ProdutoRepository";

export function ProdutoController() {
  const repository = new ProdutoRepository();

  // Listar produtos ou buscar por nome / categoria
  app.get("/produtos", (req, res) => {
    const { nome, id_categoria } = req.query;

    if (nome) {
      const produto = repository.buscarPorNome(nome as string);
      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }
      return res.json(produto);
    }

    if (id_categoria) {
      const produtos = repository.buscarPorCategoria(Number(id_categoria));
      return res.json(produtos);
    }

    res.json(repository.listarProdutos());
  });

  // Buscar por ID
  app.get("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const produto = repository.buscarPorId(id);

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    res.json(produto);
  });

  // Criar produto
  app.post("/produtos", (req, res) => {
    try {
      const {
        nome,
        id_categoria,
        tamanho,
        cor,
        codigo_barras,
        custo,
        venda,
        estoque,
        descricao,
        marca,
        id_fornecedor,
      } = req.body;

      if (!nome || nome.trim().length === 0) {
        throw new Error("Nome é obrigatório");
      }

      if (!id_categoria) {
        throw new Error("Categoria é obrigatória");
      }

      if (!venda || venda <= 0) {
        throw new Error("Preço de venda inválido");
      }

      if (!id_fornecedor) {
        throw new Error("Fornecedor é obrigatório");
      }

      const produto = repository.salvar({
        nome,
        id_categoria,
        tamanho,
        cor,
        codigo_barras,
        custo,
        venda,
        estoque,
        descricao,
        marca,
        id_fornecedor
      });

      res.status(201).json(produto);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // Atualizar produto
  app.put("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const {
        nome,
        id_categoria,
        tamanho,
        cor,
        codigo_barras,
        custo,
        venda,
        estoque,
        descricao,
        marca,
        id_fornecedor,
      } = req.body;

      const produto = repository.buscarPorId(id);
      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }

      repository.AtualizarProduto(
        id,
        nome,
        id_categoria,
        tamanho,
        cor,
        codigo_barras,
        custo,
        venda,
        estoque,
        descricao,
        marca,
        id_fornecedor
      );

      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: "Erro ao atualizar produto" });
    }
  });

  // Atualizar estoque
  app.patch("/produtos/:id/estoque", (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const { estoque } = req.body;

      if (estoque === undefined || estoque < 0) {
        throw new Error("Estoque inválido");
      }

      repository.atualizarEstoque(id, estoque);

      res.status(204).send();
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro ao atualizar estoque";
      res.status(400).json({ erro: mensagem });
    }
  });

  // Deletar produto
  app.delete("/produtos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const produto = repository.buscarPorId(id);

      if (!produto) {
        return res.status(404).json({ erro: "Produto não encontrado" });
      }

      repository.DeletarProduto(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar produto" });
    }
  });
}