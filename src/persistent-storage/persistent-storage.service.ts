import { Injectable } from '@nestjs/common';
import db from '../database';
import { WbTariffModel } from 'src/persistent-storage/models/wb-tariff-model.model';

/**
 * Allow to save box-tariffs data from the Wildberries API to a persistent-storage
 */
@Injectable()
export class DatabaseService {
    /**
     * Saves data
     */
    async saveAsync(data: WbTariffModel[]): Promise<void> {
        const [today] = new Date().toISOString().split('T');
        try {
            await db.transaction(async function (trx) {
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

            throw new Error('Failed to save data to the persistent-storage:');
        }
    }
}
