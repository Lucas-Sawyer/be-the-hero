const conexao = require('../db/connection');

module.exports = {
    async lista(request, response) {
        const id_ong = request.headers.authorization;

        const incidentes = await conexao('incidentes').where('id_ong', id_ong).select('*');

        return response.json(incidentes);
    }
}