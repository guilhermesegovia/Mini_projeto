import express from "express";
import { ClienteController } from "./controller/ClienteController";
import { AvaliacaoController } from "./controller/AvaliacaoController";
import { CarrinhoController } from "./controller/CarrinhoController";
import { ProdutoController } from "./controller/ProdutoController";
import { EstoqueController } from "./controller/EstoqueController";
import { PedidoController } from "./controller/PedidoController";
import { PagamentoController } from "./controller/PagamentoController";
import { FornecedorController } from "./controller/FornecedorController";
import { CategoriaController } from "./controller/CategoriaController";


export const app = express();

app.use(express.json());

ClienteController();
AvaliacaoController();
CarrinhoController();
ProdutoController();
EstoqueController();
PedidoController();
PagamentoController();
FornecedorController();
CategoriaController();


app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
});
