import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GoogleSheetImportService } from 'src/apis/google-sheet-import.service';

@Injectable()
export class GoogleSheetScheduleService {
    constructor(private readonly googleSheetsService: GoogleSheetImportService) {}

    @Cron('*/40 * * * * *')
    async executeAsync() {
        console.log('The data is uploaded to Google Sheets...');
        try {
            if (!process.env.TARGET_SHEETS) {
                return;
            }

            const sheets = process.env.TARGET_SHEETS.split(',');
            const promises = sheets.map((s) => {
                return this.googleSheetsService.importAsync(s);
            });
            await Promise.all(promises);
        } catch (error) {
            console.error('The error occured during the upload process: ', (error as Error).message);
        }
    }
}
