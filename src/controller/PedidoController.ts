import { app } from "../server";
import { PedidoRepository } from "../repositories/PedidoRepository";

export function PedidoController() {
  const repository = new PedidoRepository();

  // Listar pedidos ou buscar por cliente
  app.get("/pedidos", (req, res) => {
    const { id_cliente } = req.query;

    if (id_cliente) {
      const pedidos = repository.BuscarPorCliente(Number(id_cliente));
      return res.json(pedidos);
    }

    res.json(repository.listarPedidos());
  });

  // Buscar pedido por ID
  app.get("/pedidos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pedido = repository.BuscarPorId(id);

    if (!pedido) {
      return res.status(404).json({ erro: "Pedido não encontrado" });
    }

    res.json(pedido);
  });

  // Criar pedido
  app.post("/pedidos", (req, res) => {
    try {
      const {
        frete,
        cupom,
        quantidade,
        total,
        data_hora,
        endereco_entrega,
        id_cliente,
      } = req.body;

      if (!id_cliente) throw new Error("ID do cliente é obrigatório");
      if (!quantidade || quantidade <= 0) throw new Error("Quantidade inválida");
      if (!endereco_entrega || endereco_entrega.trim().length === 0) {
        throw new Error("Endereço é obrigatório");
      }

      const pedido = repository.salvar({
        frete,
        cupom,
        quantidade,
        total,
        data_hora,
        endereco_entrega,
        id_cliente,
      });

      res.status(201).json(pedido);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // Adicionar item ao pedido
  app.post("/pedidos/:id/itens", (req, res) => {
    const id_pedido = parseInt(req.params.id);

    try {
      const { id_produto, quantidade } = req.body;

      if (!id_produto) throw new Error("ID do produto é obrigatório");
      if (!quantidade || quantidade <= 0) {
        throw new Error("Quantidade inválida");
      }

      repository.adicionaritemaoPedido(id_pedido, id_produto, quantidade);

      res.status(201).json({ mensagem: "Item adicionado ao pedido" });
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro ao adicionar item";
      res.status(400).json({ erro: mensagem });
    }
  });

  // Listar itens do pedido
  app.get("/pedidos/:id/itens", (req, res) => {
    const id_pedido = parseInt(req.params.id);

    const itens = repository.ListarItensdoPedido(id_pedido);
    res.json(itens);
  });

  // Calcular total do pedido
  app.post("/pedidos/:id/calcular-total", (req, res) => {
    const id_pedido = parseInt(req.params.id);

    try {
      const total = repository.CalcularTotalPedido(id_pedido);
      res.json({ total });
    } catch (err) {
      res.status(500).json({ erro: "Erro ao calcular total do pedido" });
    }
  });

  // Atualizar pedido
  app.put("/pedidos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const { frete, cupom, quantidade, total, endereco_entrega } = req.body;

      const pedido = repository.BuscarPorId(id);
      if (!pedido) {
        return res.status(404).json({ erro: "Pedido não encontrado" });
      }

      repository.atualizarPedido(
        id,
        frete,
        cupom,
        quantidade,
        total,
        endereco_entrega
      );

      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: "Erro ao atualizar pedido" });
    }
  });

  // Deletar pedido
  app.delete("/pedidos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const pedido = repository.BuscarPorId(id);

      if (!pedido) {
        return res.status(404).json({ erro: "Pedido não encontrado" });
      }

      repository.deletarPedido(id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: "Erro ao deletar pedido" });
    }
  });
}