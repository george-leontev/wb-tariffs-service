import { Injectable } from '@nestjs/common';
import db from '../../database';
import { WbTariffModel } from 'src/models/wb-tariff-model.model';

@Injectable()
export class DbService {
    /**
     * Сохранение данных о тарифах в базу данных.
     * @param data - Данные о тарифах.
     */
    async saveTariffs(data: WbTariffModel[]): Promise<void> {
        const today = new Date().toISOString().split('T')[0];

        await db('wb_tariffs').where('date', today).del();

        for (const item of data) {
            await db('wb_tariffs').insert({
                date: today,
                box_delivery_and_storage_expr: item.boxDeliveryAndStorageExpr,
                box_delivery_base: item.boxDeliveryBase,
                box_delivery_liter: item.boxDeliveryLiter,
                box_storage_base: item.boxStorageBase,
                box_storage_liter: item.boxStorageLiter,
                warehouse_name: item.warehouseName,
            });
        }

        console.log(`Сохранено ${data.length} записей.`);
    }
}
