import { Module } from '@nestjs/common';
import { GoogleSheetImportService } from './google-sheet-import.service';
import { WildberriesExportService } from './wildberries-export.service';

Module({
    providers: [GoogleSheetImportService, WildberriesExportService],
});
export class ExternalApisModule {}
