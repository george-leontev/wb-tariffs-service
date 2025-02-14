import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { GoogleSheetImportService } from '../external-apis/google-sheet-import.service';

@Injectable()
export class GoogleSheetScheduleService {
    constructor(private readonly googleSheetImportService: GoogleSheetImportService) {}

    @Cron('*/40 * * * * *')
    async executeAsync() {
        console.log(`The scheduled event from GoogleSheetScheduleService: ${new Date().toISOString()}`);
        try {
            if (!process.env.TARGET_SHEETS) {
                return;
            }

            const sheets = process.env.TARGET_SHEETS.split(',');
            const promises = sheets.map((s) => {
                return this.googleSheetImportService.executeAsync(s);
            });
            await Promise.all(promises);
        } catch (error) {
            console.error('The error occurred during the upload process: ', (error as Error).message);
        }
    }
}
