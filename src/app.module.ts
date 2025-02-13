import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { SchedulersModule } from './schedulers/schedulers.module';
import { ApisModule } from './apis/apis.module';

@Module({
    imports: [ScheduleModule.forRoot(), ConfigModule.forRoot({ isGlobal: true }), ApisModule, SchedulersModule],
})
export class AppModule {}
