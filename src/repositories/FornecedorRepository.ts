import db from '../database/database';
import { Fornecedor } from '../models/Fornecedor';

export class FornecedorRepository {
    salvar(c: Fornecedor): Fornecedor {
        const resultado = db
            .prepare('INSERT INTO fornecedor (nome_empresa, cnpj) VALUES (?,?)')
            .run(c.nome_empresa, c.cnpj);
        
        return { id: Number(resultado.lastInsertRowid),
        nome_empresa: c.nome_empresa, cnpj: c.cnpj };
}

    listarForncedor(): Fornecedor[] {
        return db.prepare('SELECT * FROM fornecedor').all() as Fornecedor[];
 }
    BuscarPorId(id: number): Fornecedor | null {
        return (db.prepare('SELECT * FROM fornecedor WHERE id = ?').get(id) as Fornecedor) ??null;

    }     

    BuscarPorNome(nome: string): Fornecedor | null {
        const resultado = db.prepare('SELECT * FROM fornecedor WHERE nome_empresa LIKE ?').all(`%${nome}%`) as Fornecedor[];
        return resultado.length > 0 ? resultado[0] : null;
    }

    DeletarFornecedor(id: number): void {
        db.prepare('DELETE FROM fornecedor WHERE id = ?').run(id);
    }
}
