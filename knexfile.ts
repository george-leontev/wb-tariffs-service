const defaultConfig = {
    client: 'pg',
    connection: {
        host: 'localhost',
        port: 35432,
        user: 'postgres',
        password: '1234567890',
        database: 'wb_tariffs_db',
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        tableName: 'knex_migrations',
    },
};

module.exports = {
    development: {
        ...defaultConfig,
    },

    production: {
        ...defaultConfig,
        connection: {
            host: 'wb-tariff-service-database',
            port: 5432,
            user: 'postgres',
            password: '1234567890',
            database: 'wb_tariffs_db',
        },
    },
};
