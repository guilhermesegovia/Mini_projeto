import express from "express";

import { ClienteController } from "./controllers/ClienteController";


export const app = express();

app.use(express.json());

ClienteController();


app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});