import db from "../database/database";
import { Categoria } from "../models/Categoria";

export class CategoriaRepository {
    salvar(c: Categoria): Categoria {
        const resultado = db
            .prepare('INSERT INTO categoria (nome, descricao) VALUES (?, ?)')
            .run(c.nome, c.descricao);

        return {
            id: Number(resultado.lastInsertRowid),
            nome: c.nome,
            descricao: c.descricao
        };
    }

    listarCategorias(): Categoria[] {
        return db.prepare('SELECT * FROM categoria').all() as Categoria[];
    }

    buscarPorNome(nome: string): Categoria | null {
        const resultado = db.prepare("SELECT * FROM categoria WHERE nome LIKE ?").all(`%${nome}%`) as Categoria[];
        return resultado.length > 0 ? resultado[0] : null;
    }

    AtualizarCategoria(id: number, nome: string, descricao: string): void {
        db.prepare("UPDATE categoria SET nome = ?, descricao = ? WHERE id = ?").run(nome, descricao, id);
    }

    DeletarCategoria(id: number): void {
        db.prepare('DELETE FROM categoria WHERE id = ?').run(id);
    }
}