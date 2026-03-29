import db from '../database/database';
import { Cliente } from '../models/Cliente';

export class ClienteRepository {
salvar(c: Cliente): Cliente {
    const resultado = db
        .prepare('INSERT INTO cliente (nome, telefone, cpf, email, senha, endereco, cep, data_nascimento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)')
        .run(c.nome, c.telefone, c.cpf, c.email, c.senha, c.endereco, c.cep, c.data_nascimento);
    
    return { id: Number(resultado.lastInsertRowid),
    nome: c.nome, email: c.email, telefone: c.telefone, cpf: c.cpf, senha: c.senha, endereco: c.endereco, cep: c.cep, data_nascimento: c.data_nascimento };
}

    listarClientes(): Cliente[] {
        return db.prepare('SELECT * FROM cliente').all() as Cliente[];
    }

    buscarPorId(id: number): Cliente | null {
        return (db.prepare('SELECT * FROM cliente WHERE id = ?').get(id) as Cliente) ?? null;
    }
    
      buscarPorNome(nome: string): Cliente | null {
    const result = (db.prepare("SELECT * FROM cliente WHERE nome LIKE ?").all(`%${nome}%`) as Cliente[]);
    return result.length > 0 ? result[0] : null;
  }
 
AtulizarCliente(id: number, nome: string, telefone: string, cpf: string, email: string, senha: string, endereco: string, cep: string, data_nascimento: Date): void {
    db.prepare("UPDATE cliente SET nome = ?, telefone = ?, cpf = ?, email = ?, senha = ?, endereco = ?, cep = ?, data_nascimento = ? WHERE id = ?").run(nome, telefone, cpf, email, senha, endereco, cep, data_nascimento, id);
  }

DeletarCliente(id: number): void {
    db.prepare('DELETE FROM cliente WHERE id = ?').run(id);
  }
}
