import { WbTariffModel } from '../../database/models/wb-tariff-model.model';

export class WbTariffResponseModel {
    dtNextBox: Date;
    dtTillMax: Date;
    warehouseList: WbTariffModel[];
}
