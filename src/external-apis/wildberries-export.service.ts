import axios, { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WbTariffListModel } from './models/wb-tariff-list.model';
import { WbResponseModel } from './models/wb-response.model';

/**
 * Allow to export box-tariffs data from the Wildberries API
 */
@Injectable()
export class WbExportService {
    private readonly wbApiUrl?: string;
    private readonly apiKey?: string;

    constructor(private readonly configService: ConfigService) {
        this.wbApiUrl = this.configService.get<string>('WB_API_URL');
        this.apiKey = this.configService.get<string>('WB_API_KEY');
    }

    /**
     * Gets data about box-tariffs from the Wildberries API
     */
    async getAsync(): Promise<WbTariffListModel | undefined> {
        const [today] = new Date().toISOString().split('T');

        try {
            const response: AxiosResponse<WbResponseModel> = await axios.get(this.wbApiUrl!, {
                headers: {
                    Authorization: `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    date: today,
                },
            });

            console.log('The response from Wildberries API:', response.data);

            if (response && response.data.response) {
                return response.data.response.data;
            }
        } catch (error) {
            console.error('The error occurred during exporting data from Wildberries API:', (error as Error).message);

            throw new Error('Failed to retrieve data from Wildberries API');
        }
    }
}
