import { Injectable } from '@angular/core';
import { Adapter } from '../../@core/interfaces/adapter';

export class Asset {
    public id: string;
    public name: string;
    public make: string;
    public model: string;
    public serialNumber: string;
    public manufacturedDate: Date;
    public purchasedDate: Date;
    public currentWorkDone: number;
    public uoM: string;
    public imageUrl: string;
    public imageFileName: string;
    public ImageBase64: any;
    public imageMimeType: string;
    public warrantyUrl: string;
    public instructionManualUrl: string;
    public locationId: string;
    public companyId: string;
    public dateCreated: Date;
    public dateUpdated: Date;

    public constructor(init?: Partial<Asset>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class AssetAdapter implements Adapter<Asset> {
    adapt(item: any): Asset {
        const model = new Asset();
        model.id = item.id;
        model.name = item.name;
        model.make = item.make;
        model.model = item.model;
        model.serialNumber = item.serialNumber;
        if (item.manufacturedDate) {
            model.manufacturedDate = new Date(item.manufacturedDate);
        }
        if (item.purchasedDate) {
            model.purchasedDate = new Date(item.purchasedDate);
        }
        model.currentWorkDone = item.currentWorkDone;
        model.uoM = item.uoM;
        model.imageUrl = item.imageUrl;
        model.imageFileName = item.imageFileName;
        model.ImageBase64 = item.ImageBase64;
        model.imageMimeType = item.imageMimeType;
        model.warrantyUrl = item.warrantyUrl;
        model.instructionManualUrl = item.instructionManualUrl;
        model.locationId = item.locationId;
        model.companyId = item.companyId;
        model.dateCreated = item.dateCreated;
        model.dateUpdated = item.dateUpdated;

        return model;
    }
}
