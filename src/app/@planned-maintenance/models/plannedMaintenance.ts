import { Injectable } from '@angular/core';
import { Asset } from '../../@asset-core/models/asset';
import { Adapter } from '../../@core/interfaces/adapter';
import { User } from '../../@core/models/user';

export class PlannedMaintenance {
    public id: string;
    public name: string;
    public assetId: string;
    public companyId: string;
    public locationId: string;
    public defaultTechnicianId: string;
    public uom: string;
    public notes: string;
    public dateCreated: Date;
    public dateUpdated: Date;
    public expanded: boolean = false;
    public asset: Asset;
    public location: Location;
    public defaultTechnician: User;

    public constructor(init?: Partial<PlannedMaintenance>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class PlannedMaintenanceAdapter implements Adapter<PlannedMaintenance> {
    adapt(item: any): PlannedMaintenance {
        const model = new PlannedMaintenance();
        model.id = item.id;
        model.name = item.name;
        model.assetId = item.assetId;
        model.defaultTechnicianId = item.defaultTechnicianId;
        model.companyId = item.companyId;
        model.locationId = item.locationId;
        model.uom = item.uom;
        model.notes = item.notes;
        model.dateCreated = item.dateCreated;
        model.dateUpdated = item.dateUpdated;
        model.asset = item.asset;
        model.location = item.location;
        model.defaultTechnician = item.defaultTechnician;

        return model;
    }
}
