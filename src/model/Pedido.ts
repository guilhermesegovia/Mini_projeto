export interface Pedido {
    id?: number;
    frete: number;
    cupom: string;
    quantidade: number;
    total: number;
    data_hora: Date;
    endereco_entrega: string;
    id_cliente: number;
}