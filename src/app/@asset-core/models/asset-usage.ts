import { Injectable } from '@angular/core';
import { Adapter } from '../../@core/interfaces/adapter';

export class AssetUsage {
    public id: string;
    public workDone: string;
    public dateCaptured: string;
    public assetId: string;
    public dateCreated: Date;
    public dateUpdated: Date;

    public constructor(init?: Partial<AssetUsage>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class AssetUsageAdapter implements Adapter<AssetUsage> {
    adapt(item: any): AssetUsage {
        const model = new AssetUsage();
        model.id = item.id;
        model.workDone = item.workDone;
        model.dateCaptured = item.dateCaptured;
        model.assetId = item.assetId;
        model.dateCreated = item.dateCreated;
        model.dateUpdated = item.dateUpdated;

        return model;
    }
}
