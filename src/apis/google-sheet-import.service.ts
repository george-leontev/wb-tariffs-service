/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';
import db from '../database';

@Injectable()
export class GoogleSheetImportService {
    private readonly sheets: sheets_v4.Sheets;

    constructor() {
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
     * Импорт данных из базы данных в Google Таблицу.
     */
    async importAsync(spreadsheetId: string): Promise<void> {
        const data = await db('wb_tariffs').select('*').orderBy('box_delivery_and_storage_expr', 'asc');

        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        const rows = data.map((item) => [
            item.box_delivery_and_storage_expr,
            item.box_delivery_base,
            item.date,
            item.warehouse_name,
        ]);

        await this.sheets.spreadsheets.values.clear({
            spreadsheetId: spreadsheetId,
            range: 'A1:ZZ9999',
        });

        await this.sheets.spreadsheets.values.append({
            spreadsheetId: spreadsheetId,
            range: 'A1', // Начальная ячейка для записи
            valueInputOption: 'RAW',
            requestBody: {
                values: rows,
            },
        });

        console.log(`Data has been downloaded into Google Sheet ${spreadsheetId}.`);
    }
}
