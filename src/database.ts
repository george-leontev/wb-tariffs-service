import knex from 'knex';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT!, 10),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    },
    pool: {
        min: 2,
        max: 10,
    },
});

export default db;
