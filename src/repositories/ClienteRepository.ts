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
    return (db.prepare("SELECT * FROM clientes WHERE nome LIKE ?").get(`%${nome}%`) as Cliente) ?? null;
  }
}