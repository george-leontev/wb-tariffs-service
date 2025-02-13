import { Injectable } from '@nestjs/common';
import db from '../database';
import { WbTariffModel } from 'src/database/models/wb-tariff-model.model';

@Injectable()
export class DatabaseService {
    /**
     * Сохранение данных о тарифах в базу данных.
     * @param data - Данные о тарифах.
     */
    async saveAsync(data: WbTariffModel[]): Promise<void> {
        const [today] = new Date().toISOString().split('T');

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

        console.log(`Сохранено ${data.length} записей.`);
    }
}
