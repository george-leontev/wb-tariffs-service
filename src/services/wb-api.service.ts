import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { WbApiResponseItem } from '../models/wb-api-responce.model';

@Injectable()
export class WbApiService {
    private readonly wbApiUrl = 'https://dev.wildberries.ru/openapi/wb-tariffs/stocks-coefs';

    /**
     * Получение данных о тарифах коробов с API Wildberries.
     */
    async fetchTariffs(): Promise<WbApiResponseItem[]> {
        try {
            const response: AxiosResponse<WbApiResponseItem[]> = await axios.get(this.wbApiUrl);

            return response.data;
        } catch (error) {
            console.error('Ошибка при получении данных с API Wildberries:', error.message);
            throw new Error('Не удалось получить данные с API Wildberries');
        }
    }
}
