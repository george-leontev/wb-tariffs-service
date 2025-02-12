import knex from 'knex';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '55432', 10),
        user: process.env.DB_USER || 'postgres',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'wb_tariffs_db',
    },
    pool: {
        min: 2,
        max: 10,
    },
});

export default db;
