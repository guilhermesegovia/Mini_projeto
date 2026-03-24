export interface Pagamento {
    id?: number;
    metodo: string;
    status_pagamento: string;
    data_pagamento: Date;
    status_entrega: string;
    id_pedido: number;
}