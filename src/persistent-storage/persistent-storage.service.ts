import knex from 'knex';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WildberriesTariffModel } from './models/wildberries-tariff.model';

/**
 * Allow to save and get box-tariffs data to/from a persistent-storage
 */
@Injectable()
export class PersistentStorageService {
    private readonly knexInstance: knex.Knex;

    constructor(private readonly configService: ConfigService) {
        this.knexInstance = knex({
            client: 'pg',
            connection: {
                host: this.configService.get<string>('DB_HOST'),
                port: parseInt(this.configService.get<string>('DB_PORT')!, 10),
                user: this.configService.get<string>('DB_USER'),
                password: this.configService.get<string>('DB_PASSWORD'),
                database: this.configService.get<string>('DB_NAME'),
            },
            pool: {
                min: 2,
                max: 10,
            },
        });
    }

    /**
     * Saves data
     */
    async saveAsync(data: WildberriesTariffModel[]): Promise<void> {
        const [today] = new Date().toISOString().split('T');
        try {
            await this.knexInstance.transaction(async function (trx) {
                await trx('wb_tariffs').where('date', today).del();

                await trx('wb_tariffs').insert(
                    data.map((i) => {
                        return {
                            date: today,
                            box_delivery_and_storage_expr: i.boxDeliveryAndStorageExpr,
                            box_delivery_base: i.boxDeliveryBase,
                            box_delivery_liter: i.boxDeliveryLiter,
                            box_storage_base: i.boxStorageBase,
                            box_storage_liter: i.boxStorageLiter,
                            warehouse_name: i.warehouseName,
                        };
                    }),
                );
            });
            console.log(`It has been saved ${data.length} records.`);
        } catch (error) {
            console.error('The error occurred during saving data to the persistent-storage:', (error as Error).message);

            throw new Error('Failed to save data to the persistent-storage.');
        }
    }

    /**
     * Gets data
     */
    async getAsync(): Promise<any[]> {
        const data = await this.knexInstance('wb_tariffs').select('*').orderBy('box_delivery_and_storage_expr', 'asc');

        return data;
    }
}
