export interface Cliente {
    id?: number;
    nome: string;
    telefone: string;
    cpf: string;
    email: string;
    senha: string;
    endereco: string;
    cep: string;
    data_nascimento?: Date;
}