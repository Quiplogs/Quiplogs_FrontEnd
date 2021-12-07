import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';

export class LocationEntity {
    public id: string;
    public name: string;
    public city: string;
    public country: string;
    public lat: string;
    public long: string;
    public imageUrl: string;
    public imageFileName: string;
    public ImageBase64: any;
    public imageMimeType: string;
    public userId: string;
    public companyId: string;
    public dateCreated: Date;
    public dateUpdated: Date;

    public constructor(init?: Partial<LocationEntity>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class LocationAdapter implements Adapter<LocationEntity> {
    adapt(item: any): LocationEntity {
        const model = new LocationEntity();
        model.id = item.id;
        model.name = item.name;
        model.city = item.city;
        model.country = item.country;
        model.lat = item.lat;
        model.long = item.long;
        model.imageUrl = item.imageUrl;
        model.imageFileName = item.imageFileName;
        model.userId = item.userId;
        model.companyId = item.companyId;
        model.dateCreated = item.dateCreated;
        model.dateUpdated = item.dateUpdated;

        return model;
    }
}
