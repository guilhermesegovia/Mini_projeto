import db from '../database/database';
import { Avaliacao } from '../models/Avaliacao';

export class AvaliacaoRepository {
    salvar(a: Avaliacao): Avaliacao {
        const resultado = db
            .prepare('INSERT INTO avaliacao (comentario, estrelas) VALUES (?, ?)')
            .run(a.comentario, a.estrelas);

        return {
            id: Number(resultado.lastInsertRowid),
            comentario: a.comentario,
            estrelas: a.estrelas
        };
    }

    listarAvaliacoes(): Avaliacao[] {
        return db.prepare('SELECT * FROM avaliacao').all() as Avaliacao[];
    }

    listarAvaliacoesPorProduto(id_produto: number): Avaliacao[] {
        return db.prepare('SELECT * FROM avaliacao WHERE id_produto = ?').all(id_produto) as Avaliacao[];
}

    DeletarAvaliacao(id: number): void {
        db.prepare('DELETE FROM avaliacao WHERE id = ?').run(id);
    }
}