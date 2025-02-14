/* eslint-disable @typescript-eslint/no-unsafe-call */

export async function up(knex) {
    await knex.schema.createTable('wb_tariffs', (table) => {
        table.increments('id').primary();
        table.date('date').notNullable();
        table.string('warehouse_name');
        table.string('box_delivery_and_storage_expr');
        table.string('box_delivery_base');
        table.string('box_delivery_liter');
        table.string('box_storage_base');
        table.string('box_storage_liter');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex): Promise<void> {
    await knex.schema.dropTable('wb_tariffs');
}
