import { Injectable } from '@angular/core';
import { Adapter } from '../../@core/interfaces/adapter';

export class Part {
    public id: string;
    public code: string;
    public name: string;
    public description: string;
    public companyId: string;
    public imageUrl: string;
    public imageFileName: string;
    public ImageBase64: any;
    public imageMimeType: string;
    public dateCreated: Date;
    public dateUpdated: Date;

    public constructor(init?: Partial<Part>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class PartAdapter implements Adapter<Part> {
    adapt(item: any): Part {
        const model = new Part();
        model.id = item.id;
        model.code = item.code;
        model.name = item.name;
        model.description = item.description;
        model.companyId = item.companyId;
        model.imageUrl = item.imageUrl;
        model.imageFileName = item.imageFileName;
        model.dateCreated = item.dateCreated;
        model.dateUpdated = item.dateUpdated;

        return model;
    }
}
