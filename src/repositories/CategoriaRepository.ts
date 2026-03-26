import db from "../database/database";
import { Categoria } from "../models/Categoria";

export class CategoriaRepository {
    salvar(c: Categoria): Categoria {
        const resultado = db
            .prepare('INSERT INTO categoria (nome) VALUES (?)')
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
        return (db.prepare("SELECT * FROM categoria WHERE nome LIKE ?").get(`%${nome}%`) as Categoria) ?? null;
    }

    
}