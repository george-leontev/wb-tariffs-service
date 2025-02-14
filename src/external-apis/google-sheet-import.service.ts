import { Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';
import { PersistentStorageService } from '../persistent-storage/persistent-storage.service';

/**
 * Allow to import collected data in the persistent-storage into Google Sheet table
 */
@Injectable()
export class GoogleSheetImportService {
    private readonly sheets: sheets_v4.Sheets;

    constructor(private readonly persistentStorageService: PersistentStorageService) {
        const auth = new google.auth.GoogleAuth({
            keyFile: `${global.appRootPath}/google-credentials.json`,
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        this.sheets = google.sheets({ version: 'v4', auth });
    }

    /**
     * Imports data from the persistent-storage into Google Sheet table
     */
    async executeAsync(spreadsheetId: string): Promise<void> {
        try {
            const data = await this.persistentStorageService.getAsync();

            const sheet = data.map((item) => {
                return [item.box_delivery_and_storage_expr, item.box_delivery_base, item.date, item.warehouse_name];
            });

            await this.sheets.spreadsheets.values.clear({
                spreadsheetId: spreadsheetId,
                range: 'A1:Z9999',
            });

            await this.sheets.spreadsheets.values.append({
                spreadsheetId: spreadsheetId,
                range: 'A1',
                valueInputOption: 'RAW',
                requestBody: {
                    values: sheet,
                },
            });
            console.log(`Data has been downloaded into Google Sheet ${spreadsheetId}.`);
        } catch (error) {
            console.error('The error occurred during downloading data into Goggle Sheet:', (error as Error).message);

            throw new Error(`Failed to send data into Goggle Sheet ${spreadsheetId}`);
        }
    }
}
