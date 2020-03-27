const crypto = require('crypto');
const conexao = require('../db/connection');

module.exports = {
    async lista(request, response) {
        const ongs = await conexao('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        const { nome, email, whatsapp, cidade, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await conexao('ongs').insert({
            id,
            nome,
            email,
            whatsapp,
            cidade,
            uf,
        })

        return response.json({ id });
    }
}