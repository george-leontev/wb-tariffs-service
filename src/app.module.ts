import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { SchedulersModule } from './schedulers/schedulers.module';
import { ExternalApisModule } from './external-apis/external-apis.module';

@Module({
    imports: [ScheduleModule.forRoot(), ConfigModule.forRoot({ isGlobal: true }), ExternalApisModule, SchedulersModule],
})
export class AppModule {}
