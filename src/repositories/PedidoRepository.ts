import db from '../database/database';
import { Pedido } from '../models/Pedido';

export class PedidoRepository {
    salvar(p: Pedido): Pedido {
        const resultado = db
            .prepare(`INSERT INTO pedido (frete, cupom, quantidade, total, data_hora, endereco_entrega, id_cliente) VALUES (?, ?, ?, ?, ?, ?, ?)`)
            .run(p.frete, p.cupom, p.quantidade, p.total, p.data_hora, p.endereco_entrega, p.id_cliente);
          
        return {
            id: Number(resultado.lastInsertRowid),
            id_cliente: p.id_cliente,
            quantidade: p.quantidade,
            data_hora: p.data_hora,
            frete: p.frete,
            cupom: p.cupom,
            total: p.total,
            endereco_entrega: p.endereco_entrega
        };
    }

    adicionaritemaoPedido(id_pedido: number, id_produto: number, quantidade: number): void {
        db.prepare('INSERT INTO item_pedido (id_pedido, id_produto, quantidade) VALUES (?, ?, ?)').run(id_pedido, id_produto, quantidade);
    }

    listarPedidos(): Pedido[] {
        return db.prepare('SELECT * FROM pedido').all() as Pedido[];
    }

    BuscarPorId(id: number): Pedido | null {
        return (db.prepare('SELECT * FROM pedido WHERE id = ?').get(id) as Pedido) ?? null;
    }

    BuscarPorCliente(id_cliente: number): Pedido[] {
        return db.prepare('SELECT * FROM pedido WHERE id_cliente = ?').all(id_cliente) as Pedido[];
    }

    ListarItensdoPedido(id_pedido: number): { id_produto: number; quantidade: number }[] {
        return db.prepare('SELECT id_produto, quantidade FROM item_pedido WHERE id_pedido = ?').all(id_pedido) as { id_produto: number; quantidade: number }[];
    }

    CalcularTotalPedido(id_pedido: number): number {
        const resultado = db.prepare(`
            SELECT SUM(p.venda * pp.quantidade) AS total FROM item_pedido pp JOIN produto p ON pp.id_produto = p.id WHERE pp.id_pedido = ?`).get(id_pedido) as { total: number | null };

    const total = resultado.total ?? 0;

    db.prepare('UPDATE pedido SET total = ? WHERE id = ?')
      .run(total, id_pedido);

    return total;
}
    atualizarPedido(
        id: number,
        frete: number,
        cupom: string,
        quantidade: number,
        total: number,
        endereco_entrega: string
    ): void {
        db.prepare(`
            UPDATE pedido 
            SET frete = ?, cupom = ?, quantidade = ?, total = ?, endereco_entrega = ? WHERE id = ?`).run(frete, cupom, quantidade, total, endereco_entrega, id);
    }

    deletarPedido(id: number): void {
        db.prepare('DELETE FROM pedido WHERE id = ?').run(id);
}
}