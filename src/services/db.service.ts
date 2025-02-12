import { Injectable } from '@nestjs/common';
import knex from '../../knexfile';
import { WbApiResponseItem } from '../models/wb-api-responce.model';

@Injectable()
export class DbService {
    /**
     * Сохранение данных о тарифах в базу данных.
     * @param data - Данные о тарифах.
     */
    async saveTariffs(data: WbApiResponseItem[]): Promise<void> {
        const today = new Date().toISOString().split('T')[0];
        const filteredData = data.filter((item) => item.date === today);

        for (const item of filteredData) {
            await knex('stocks_coefs')
                .insert({
                    region_id: item.regionId,
                    region_name: item.regionName,
                    coefficient: item.coefficient,
                    date: item.date,
                })
                .onConflict(['region_id', 'date'])
                .merge();
        }
    }
}
