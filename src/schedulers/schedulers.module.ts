import { Module } from '@nestjs/common';
import { GoogleSheetScheduleService } from './google-sheet-schedule.service';
import { TariffBoxesUpdaterScheduleService } from './tariff-boxes-updater-schedule.service';
import { GoogleSheetImportService } from 'src/apis/google-sheet-import.service';
import { WbApiService } from 'src/apis/wb-api.service';
import { DatabaseService } from 'src/database/database.service';

@Module({
    providers: [
        GoogleSheetScheduleService,
        TariffBoxesUpdaterScheduleService,
        GoogleSheetImportService,
        WbApiService,
        DatabaseService,
    ],
})
export class SchedulersModule {}
