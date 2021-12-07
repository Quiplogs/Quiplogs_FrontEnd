import { Injectable } from '@angular/core';
import { Adapter } from '../../@core/interfaces/adapter';

export class PlannedMaintenancePart {
    public id: string;
    public plannedMaintenanceId: string;
    public partId: string;
    public quantity: string;
    public uom: string;
    public partCode: string;
    public dateCreated: Date;
    public dateUpdated: Date;
    public part: any;
    public canEdit: boolean = false;
    public hasSchedule: boolean;

    public constructor(init?: Partial<PlannedMaintenancePart>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class PlannedMaintenancePartAdapter implements Adapter<PlannedMaintenancePart> {
    adapt(item: any): PlannedMaintenancePart {
        const model = new PlannedMaintenancePart();
        model.id = item.id;
        model.plannedMaintenanceId = item.plannedMaintenanceId;
        model.partId = item.partId;
        model.partCode = item.partCode;
        model.quantity = item.quantity;
        model.uom = item.uom;
        model.dateCreated = item.dateCreated;
        model.dateUpdated = item.dateUpdated;
        model.part = item.part;

        return model;
    }
}
