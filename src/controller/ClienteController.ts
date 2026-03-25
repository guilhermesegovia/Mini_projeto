import { app } from '../server';
import { ClienteRepository } from '../repositories/ClienteReposity';

export function ClienteController() {
    const clienteRepository = new ClienteRepository();

    app.get('/clientes', async (req, res) => {
        const { nome } = req.query;

        if (nome) {
            const clientes = await clienteRepository.buscarPorNome(nome as string);
            if (!clientes) return res.status(404).json({ message: 'Cliente não encontrado' });
            return res.json(clientes);  
        }


}