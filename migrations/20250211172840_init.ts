import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('stocks_coefs', (table) => {
        table.increments('id').primary(); // Уникальный ID записи
        table.integer('region_id').notNullable(); // ID региона
        table.string('region_name').notNullable(); // Название региона
        table.float('coefficient').notNullable(); // Коэффициент тарифа
        table.date('date').notNullable(); // Дата тарифа
        table.timestamp('created_at').defaultTo(knex.fn.now()); // Время создания записи
        table.timestamp('updated_at').defaultTo(knex.fn.now()); // Время последнего обновления
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('stocks_coefs'); // Удаление таблицы при откате миграции
}
