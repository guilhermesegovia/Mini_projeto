import db from '../database/database';
import { Estoque } from '../models/Estoque';

export class EstoqueRepository {
    salvar(e: Estoque): Estoque {
        const resultado = db
            .prepare('INSERT INTO estoque (tipo, quantidade, data_entrada, data_saida, id_produto, id_funcionario) VALUES (?, ?, ?, ?, ?, ?)')
            .run(e.tipo, e.quantidade, e.data_entrada, e.data_saida, e.id_produto, e.id_funcionario);

        return {
            id: Number(resultado.lastInsertRowid),
            tipo: e.tipo,
            quantidade: e.quantidade,
            data_entrada: e.data_entrada,
            data_saida: e.data_saida,
            id_produto: e.id_produto,
            id_funcionario: e.id_funcionario
        };
    }

    listarEstoques(): Estoque[] {
        return db.prepare('SELECT * FROM estoque').all() as Estoque[];
    }

    buscarPorId(id: number): Estoque | null {
        return (db.prepare('SELECT * FROM estoque WHERE id = ?').get(id) as Estoque) ?? null;
    }

    buscarPorProduto(id_produto: number): Estoque[] {
    return db.prepare('SELECT * FROM estoque WHERE id_produto = ?').get(id_produto) as Estoque[] ?? null;
  }
}