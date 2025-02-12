/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WbApiService } from '../services/wb-api.service';
import { DbService } from '../services/db.service';

@Injectable()
export class TariffUpdaterScheduler {
    constructor(
        private readonly wbApiService: WbApiService,
        private readonly dbService: DbService,
    ) {}

    @Cron('*/1 * * * *')
    async handleCron() {
        console.log('Получение данных с API Wildberries...');
        try {
            const data = await this.wbApiService.fetchTariffs();
            await this.dbService.saveTariffs(data.warehouseList);

            console.log('Данные успешно сохранены в базу данных.');
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error.message);
        }
    }
}
