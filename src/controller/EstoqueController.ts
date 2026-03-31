import { app } from "../server";
import { EstoqueRepository } from "../repositories/Estoque";

export function EstoqueController() {
  const repository = new EstoqueRepository();

  // 🔹 Listar todos estoques
  app.get("/estoque", (req, res) => {
    try {
      res.json(repository.listarEstoques());
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Buscar por ID
  app.get("/estoque/:id", (req, res) => {
    try {
      const id = Number(req.params.id);

      if (isNaN(id)) throw new Error("ID inválido");

      const estoque = repository.buscarPorId(id);

      if (!estoque)
        return res.status(404).json({ erro: "Registro não encontrado" });

      res.json(estoque);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Buscar estoque por produto
  app.get("/estoque/produto/:id_produto", (req, res) => {
    try {
      const id_produto = Number(req.params.id_produto);

      if (isNaN(id_produto)) throw new Error("ID do produto inválido");

      const estoques = repository.buscarPorProduto(id_produto);

      res.json(estoques);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Criar registro direto (manual)
  app.post("/estoque", (req, res) => {
    try {
      const {
        tipo,
        quantidade,
        data_entrada,
        data_saida,
        id_produto,
        id_funcionario
      } = req.body;

      if (!tipo) throw new Error("Tipo é obrigatório");

      if (!quantidade || quantidade <= 0)
        throw new Error("Quantidade inválida");

      const estoque = repository.salvar({
        tipo,
        quantidade,
        data_entrada,
        data_saida,
        id_produto,
        id_funcionario
      });

      res.status(201).json(estoque);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Registrar movimentação (entrada/saída)
  app.post("/estoque/movimentacao", (req, res) => {
    try {
      const { id_produto, id_funcionario, tipo, quantidade } = req.body;

      if (!id_produto || !id_funcionario)
        throw new Error("Produto e funcionário são obrigatórios");

      if (!quantidade || quantidade <= 0)
        throw new Error("Quantidade inválida");

      const tiposValidos = ["entrada", "saida_venda", "saida_troca", "saida_avaria"];

      if (!tiposValidos.includes(tipo))
        throw new Error("Tipo de movimentação inválido");

      repository.RegistrarMovimentacao(
        id_produto,
        id_funcionario,
        tipo,
        quantidade
      );

      res.status(201).json({ mensagem: "Movimentação registrada com sucesso" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Listar movimentações de um produto
  app.get("/estoque/movimentacoes/:id_produto", (req, res) => {
    try {
      const id_produto = Number(req.params.id_produto);

      if (isNaN(id_produto)) throw new Error("ID inválido");

      const movimentacoes = repository.ListarMovimentacoes(id_produto);

      res.json(movimentacoes);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // 🔹 Verificar estoque baixo
  app.get("/estoque/baixo/:id_produto", (req, res) => {
    try {
      const id_produto = Number(req.params.id_produto);
      const { minimo } = req.query;

      if (isNaN(id_produto)) throw new Error("ID inválido");

      const quantidade_minima = Number(minimo) || 0;

      const baixo = repository.VerificarEstoqueBaixo(
        id_produto,
        quantidade_minima
      );

      res.json({ estoque_baixo: baixo });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });
}