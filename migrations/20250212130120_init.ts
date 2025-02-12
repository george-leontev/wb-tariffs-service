import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('wb_tariffs', (table) => {
        table.increments('id').primary();
        table.date('date').notNullable(); // Дата запроса
        table.string('warehouse_name').notNullable(); // Имя склада (ключ для обновления)
        table.string('box_delivery_and_storage_expr');
        table.string('box_delivery_base');
        table.string('box_delivery_liter');
        table.string('box_storage_base');
        table.string('box_storage_liter');
        table.unique(['date', 'warehouse_name']); // Гарантия, что обновляем данные за день
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('wb_tariffs');
}
