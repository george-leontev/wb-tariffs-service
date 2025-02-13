import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WbApiService } from 'src/apis/wb-api.service';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TariffBoxesUpdaterScheduleService {
    constructor(
        private readonly wbApiService: WbApiService,
        private readonly databaseService: DatabaseService,
    ) {}

    @Cron('*/20 * * * * *')
    async executeAsync() {
        console.log('Получение данных с API Wildberries...');
        try {
            const data = await this.wbApiService.getAsync();
            await this.databaseService.saveAsync(data.warehouseList);

            console.log('Данные успешно сохранены в базу данных.');
        } catch (error) {
            console.error('Ошибка при обновлении данных:', (error as Error).message);
        }
    }
}
