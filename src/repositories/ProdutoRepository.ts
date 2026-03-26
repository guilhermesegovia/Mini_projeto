import db from '../database/database';
import { Produto } from '../models/Produto';

export class ProdutoRepository {
    salvar(p: Produto): Produto {
        const resultado = db
            .prepare('INSERT INTO produto (nome, id_categoria, tamanho, cor, codigo_barras, custo, venda, estoque, data_cadastro, descricao, marca, id_fornecedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            .run(p.nome, p.id_categoria, p.tamanho, p.cor, p.codigo_barras, p.custo, p.venda, p.estoque ?? 0, new Date(), p.descricao, p.marca, p.id_fornecedor);

            return {
                id: Number(resultado.lastInsertRowid),
                nome: p.nome,
                id_categoria: p.id_categoria,
                tamanho: p.tamanho,
                cor: p.cor,
                codigo_barras: p.codigo_barras,
                custo: p.custo,
                venda: p.venda,
                estoque: p.estoque ?? 0,
                data_cadastro: new Date(),
                descricao: p.descricao,
                marca: p.marca,
                id_fornecedor: p.id_fornecedor
            };
    }

    listarProdutos(): Produto[] {
        return db.prepare('SELECT * FROM produto').all() as Produto[];
    }

    buscarPorId(id: number): Produto | null {
        return (db.prepare('SELECT * FROM produto WHERE id = ?').get(id) as Produto) ?? null;
    }

        buscarPorNome(nome: string): Produto | null {
    return (db.prepare("SELECT * FROM produto WHERE nome LIKE ?").get(`%${nome}%`) as Produto) ?? null;
  }    

  buscarPorCategoria(id_categoria: number): Produto[] {
    return db.prepare('SELECT * FROM produto WHERE id_categoria = ?').get(id_categoria) as Produto[];
  }

    atualizarEstoque(id: number, estoque: number): void {
    db.prepare("UPDATE produtos SET estoque = ? WHERE id = ?").run(estoque, id);
  }
}
