import { app } from "../server";
import { PagamentoRepository } from "../repositories/PagamentoRepository";

export function PagamentoController() {
  const repository = new PagamentoRepository();

  // Listar todos os pagamentos
  app.get("/pagamentos", (req, res) => {
    res.json(repository.ListarPagamentos());
  });

  // Buscar pagamento por ID do pedido
  app.get("/pagamentos/pedido/:id_pedido", (req, res) => {
    const id_pedido = parseInt(req.params.id_pedido);

    const pagamento = repository.BuscarPagamentoPorPedido(id_pedido);

    if (!pagamento) {
      return res.status(404).json({ erro: "Pagamento não encontrado para este pedido" });
    }

    res.json(pagamento);
  });

  // Registrar pagamento
  app.post("/pagamentos", (req, res) => {
    try {
      const {
        metodo,
        status_pagamento,
        data_pagamento,
        status_entrega,
        valor,
        id_pedido,
      } = req.body;

      if (!metodo || metodo.trim().length === 0) {
        throw new Error("Método de pagamento é obrigatório");
      }

      if (!status_pagamento || status_pagamento.trim().length === 0) {
        throw new Error("Status do pagamento é obrigatório");
      }

      if (!valor || valor <= 0) {
        throw new Error("Valor inválido");
      }

      if (!id_pedido) {
        throw new Error("ID do pedido é obrigatório");
      }

      const pagamento = repository.RegistrarPagamento({
        metodo,
        status_pagamento,
        data_pagamento,
        status_entrega,
        valor,
        id_pedido,
      });

      res.status(201).json(pagamento);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro interno";
      res.status(400).json({ erro: mensagem });
    }
  });

  // Atualizar status do pagamento
  app.patch("/pagamentos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    try {
      const { status_pagamento } = req.body;

      if (!status_pagamento || status_pagamento.trim().length === 0) {
        throw new Error("Status do pagamento é obrigatório");
      }

      repository.AtualizarStatusPagamento(id, status_pagamento);

      res.status(204).send();
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : "Erro ao atualizar pagamento";
      res.status(400).json({ erro: mensagem });
    }
  });
}