const conexao = require('../db/connection');

module.exports = {
    async lista(request, response) {
        const { page = 1 } = request.query;

        const [count] = await conexao('incidentes').count();

        const incidentes = await conexao('incidentes')
            .join('ongs', 'ongs.id', '=', 'incidentes.id_ong')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidentes.*',
                'ongs.nome',
                'ongs.cidade']);

        response.header('X-Total-Count', count['count(*)']);

        console.log(count);
        return response.json(incidentes);
    },

    async create(request, response) {
        const { titulo, descricao, valor } = request.body;
        const id_ong = request.headers.authorization;

        const [id] = await conexao('incidentes').insert({
            titulo,
            descricao,
            valor,
            id_ong,
        })

        return response.json({ id });
    },
    async delete(request, response) {
        const { id } = request.params;
        const id_ong = request.headers.authorization;

        const incidentes = await conexao('incidentes').where('id', id).select('id_ong').first();

        if (incidentes.id_ong != id_ong) {
            return response.status(401).json({ error: "Usuario sem permisão" });
        }
        await conexao('incidentes').where('id', id).delete();

        return response.status(204).send();
    }
}