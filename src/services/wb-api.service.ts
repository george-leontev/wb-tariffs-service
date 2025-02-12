import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { WbTariffResponseModel } from '../models/wb-tariff-model.model';

@Injectable()
export class WbApiService {
    private readonly wbApiUrl = 'https://common-api.wildberries.ru/api/v1/tariffs/box';
    private readonly apiKey?: string;

    constructor(private readonly configService: ConfigService) {
        this.apiKey = this.configService.get<string>('WB_API_KEY');
    }

    /**
     * Получение данных о тарифах коробов с API Wildberries.
     */
    async fetchTariffs(): Promise<WbTariffResponseModel> {
        const today = new Date().toISOString().split('T')[0];

        try {
            const response: AxiosResponse<WbTariffResponseModel> = await axios.get(this.wbApiUrl, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    date: today,
                },
            });

            console.log('Ответ от API:', response.data);

            /* eslint-disable @typescript-eslint/no-unsafe-member-access */
            if (response.data && (response.data as any).response) {
                const result = (response.data as any).response.data as WbTariffResponseModel;

                return result;
            }

            throw new Error();
        } catch (error) {
            console.error('Ошибка при получении данных с API Wildberries:', (error as Error).message);

            throw new Error('Не удалось получить данные с API Wildberries');
        }
    }
}
