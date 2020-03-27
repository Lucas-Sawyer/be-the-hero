
exports.up = function (knex) {
    return knex.schema.createTable('incidentes', function (table) {
        table.increments();

        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.decimal('valor').notNullable();

        table.string('id_ong').notNullable();

        table.foreign('id_ong').references('id').inTable('ongs');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('incidentes');

};
