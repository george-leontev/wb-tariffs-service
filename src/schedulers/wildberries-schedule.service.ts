import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WildberriesExportService } from 'src/external-apis/wildberries-export.service';
import { PersistentStorageService } from 'src/persistent-storage/persistent-storage.service';

@Injectable()
export class TariffBoxesUpdaterScheduleService {
    constructor(
        private readonly wildberriesExportService: WildberriesExportService,
        private readonly persistentStorageService: PersistentStorageService,
    ) {}

    @Cron('*/20 * * * * *')
    async executeAsync() {
        try {
            console.log('Exporting data from  Wildberries API...');

            const tariffList = await this.wildberriesExportService.executeAsync();
            if (tariffList) {
                await this.persistentStorageService.executeAsync(tariffList.warehouseList);
            }
        } catch (error) {
            console.error((error as Error).message);
        }
    }
}
