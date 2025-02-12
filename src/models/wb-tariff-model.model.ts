export class WbTariffResponseModel {
    dtNextBox: Date;
    dtTillMax: Date;
    warehouseList: WbTariffModel[];
}

export class WbTariffModel {
    boxDeliveryAndStorageExpr: string;
    boxDeliveryBase: string;
    boxDeliveryLiter: string;
    boxStorageBase: string;
    boxStorageLiter: string;
    warehouseName: string;
}
