import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';

export class BlobEntity {
    public id: string;
    public companyId: string;
    public foreignKeyId: string;
    public fileName: string;
    public mimeType: string;
    public fileUrl: string;
    public applicationType: string;

    public constructor(init?: Partial<BlobEntity>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class BlobEntityAdapter implements Adapter<BlobEntity> {
    adapt(item: any): BlobEntity {
        const model = new BlobEntity();
        model.id = item.id;
        model.companyId = item.companyId;
        model.foreignKeyId = item.foreignKeyId;
        model.mimeType = item.mimeType;
        model.fileUrl = item.fileUrl;
        model.applicationType = item.applicationType;

        return model;
    }
}
