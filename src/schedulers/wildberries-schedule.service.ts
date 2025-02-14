import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WildberriesExportService } from '../external-apis/wildberries-export.service';
import { PersistentStorageService } from '../persistent-storage/persistent-storage.service';

@Injectable()
export class WildberriesScheduleService {
    constructor(
        private readonly wildberriesExportService: WildberriesExportService,
        private readonly persistentStorageService: PersistentStorageService,
    ) {}

    @Cron('*/20 * * * * *')
    async executeAsync() {
        console.log(`The scheduled event from WildberriesScheduleService: ${new Date().toISOString()}`);

        try {
            const tariffList = await this.wildberriesExportService.executeAsync();
            if (tariffList) {
                await this.persistentStorageService.saveAsync(tariffList.warehouseList);
            }
        } catch (error) {
            console.error((error as Error).message);
        }
    }
}
