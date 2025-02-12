// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// /* eslint-disable @typescript-eslint/no-unsafe-return */
// import { Injectable } from '@nestjs/common';
// import { google, sheets_v4 } from 'googleapis';
// import db from '../../database';

// @Injectable()
// export class GoogleSheetsService {
//     private readonly sheets: sheets_v4.Sheets;
//     private readonly spreadsheetId = 'sheet_id';
//     private readonly sheetName = 'test_posts';

//     constructor() {
//         const auth = new google.auth.GoogleAuth({
//             keyFile: 'path/to/your/credentials.json',
//             scopes: ['https://www.googleapis.com/auth/spreadsheets'],
//         });

//         this.sheets = google.sheets({ version: 'v4', auth });
//     }

//     /**
//      * Импорт данных из базы данных в Google Таблицу.
//      */
//     async importDataToSheet(): Promise<void> {
//         const data = await db('test_posts').select('post_id', 'user_id', 'title', 'body').orderBy('post_id', 'asc');

//         const rows = data.map((item) => [item.post_id, item.user_id, item.title, item.body]);
//         const values = [['Post ID', 'User ID', 'Title', 'Body'], ...rows]; // Заголовок + данные

//         // Обновление данных в Google Таблице
//         await this.sheets.spreadsheets.values.update({
//             spreadsheetId: this.spreadsheetId,
//             range: `${this.sheetName}!A1`,
//             valueInputOption: 'RAW',
//             requestBody: {
//                 values,
//             },
//         });

//         console.log('Данные успешно выгружены в Google Таблицу.');
//     }
// }
