import { Module } from '@nestjs/common';
import { GoogleSheetScheduleService } from './google-sheet-schedule.service';
import { WildberriesScheduleService } from './wildberries-schedule.service';
import { GoogleSheetImportService } from '../external-apis/google-sheet-import.service';
import { WildberriesExportService } from '../external-apis/wildberries-export.service';
import { PersistentStorageService } from '../persistent-storage/persistent-storage.service';

@Module({
    providers: [
        GoogleSheetScheduleService,
        WildberriesScheduleService,
        GoogleSheetImportService,
        WildberriesExportService,
        PersistentStorageService,
    ],
})
export class SchedulersModule {}
