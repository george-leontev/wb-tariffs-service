// /* eslint-disable @typescript-eslint/no-unsafe-member-access */
// import { Injectable } from '@nestjs/common';
// import { Cron } from '@nestjs/schedule';
// import { GoogleSheetsService } from '../services/google-sheets.service';

// @Injectable()
// export class GoogleSheetsScheduler {
//     constructor(private readonly googleSheetsService: GoogleSheetsService) {}

//     /**
//      * Ежедневная выгрузка данных в Google Таблицу.
//      * Каждый день в 00:00.
//      */
//     @Cron('*/2 * * * *')
//     async handleCron() {
//         console.log('Выгрузка данных в Google Таблицу...');
//         try {
//             await this.googleSheetsService.importDataToSheet();
//             console.log('Данные успешно выгружены в Google Таблицу.');
//         } catch (error) {
//             console.error('Ошибка при выгрузке данных:', error.message);
//         }
//     }
// }
