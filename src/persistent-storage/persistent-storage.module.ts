import { Module } from '@nestjs/common';
import { PersistentStorageService } from './persistent-storage.service';

@Module({
    providers: [PersistentStorageService],
})
export class PersistentStorageModule {}
