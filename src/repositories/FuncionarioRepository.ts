import db from '../database/database';
import { Funcionario } from '../models/Funcionario';

export class FuncionarioRepository {
    salvar(f: Funcionario): Funcionario {
        const resultado = db
            .prepare('INSERT INTO funcionario (nome, setor, cargo, data_nascimento, cpf, email) VALUES (?, ?, ?, ?, ?, ?)')
            .run(f.nome, f.setor, f.cargo, f.data_nascimento, f.cpf, f.email);

            return {
                id: Number(resultado.lastInsertRowid),
                nome: f.nome,
                setor: f.setor,
                cargo: f.cargo,
                data_nascimento: f.data_nascimento,
                cpf: f.cpf,
                email: f.email
            };
    }

    listarFuncionarios(): Funcionario[] {
        return db.prepare('SELECT * FROM funcionario').all() as Funcionario[];
    }

    buscarPorId(id: number): Funcionario | null {
        return (db.prepare('SELECT * FROM funcionario WHERE id = ?').get(id) as Funcionario) ?? null;
    }

    buscarPorNome(nome: string): Funcionario | null {
        const resultado = db.prepare("SELECT * FROM funcionario WHERE nome LIKE ?").all(`%${nome}%`) as Funcionario[];
        return resultado.length > 0 ? resultado[0] : null;
  }

    AtualizarFuncionario(id: number, nome: string, setor: string, cargo: string, data_nascimento: Date, cpf: string, email: string): void {
    db.prepare("UPDATE funcionario SET nome = ?, setor = ?, cargo = ?, data_nascimento = ?, cpf = ?, email = ? WHERE id = ?").run(nome, setor, cargo, data_nascimento, cpf, email, id);
  }

    DeletarFuncionario(id: number): void {
        db.prepare('DELETE FROM funcionario WHERE id = ?').run(id);
    }

}
