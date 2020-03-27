const conexao = require('../db/connection');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const ong = await conexao('ongs').where('id', id).select('nome').first();

        if (!ong) {
            return response.status(400).json({ error: "ID não encontrado" });
        }
        return response.json(ong);
    }
}