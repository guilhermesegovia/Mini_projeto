export interface Produto {
    id?: number;
    nome: string;
    id_categoria: number;
    tamanho: string;
    cor: string;
    codigo_barras: string;
    custo: number;
    venda: number;
    estoque: number;
    data_cadastro?: Date;
    descricao: string;
    marca: string;
    id_fornecedor: number;
}