import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { WbApiService } from './services/wb-api.service';
import { DbService } from './services/db.service';
import { TariffUpdaterScheduler } from './schedulers/tariff-updater.scheduler';
// import { GoogleSheetsService } from './services/google-sheets.service';
// import { GoogleSheetsScheduler } from './schedulers/google-sheets.scheduler';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [ScheduleModule.forRoot(), ConfigModule.forRoot({ isGlobal: true })],
    providers: [WbApiService, DbService, TariffUpdaterScheduler],
})
export class AppModule {}
