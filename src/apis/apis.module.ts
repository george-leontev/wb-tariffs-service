import { Module } from '@nestjs/common';
import { GoogleSheetImportService } from './google-sheet-import.service';
import { WbApiService } from './wb-api.service';

Module({
    providers: [GoogleSheetImportService, WbApiService],
});
export class ApisModule {}
