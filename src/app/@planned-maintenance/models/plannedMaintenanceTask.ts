import { Injectable } from '@angular/core';
import { Adapter } from '../../@core/interfaces/adapter';

export class PlannedMaintenanceTask {
    public id: string;
    public plannedMaintenanceId: string;
    public description: string;
    public quantityRequired: number;
    public uom: string;
    public dateCreated: Date;
    public dateUpdated: Date;
    public canEdit: boolean;

    public constructor(init?: Partial<PlannedMaintenanceTask>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class PlannedMaintenanceTaskAdapter implements Adapter<PlannedMaintenanceTask> {
    adapt(item: any): PlannedMaintenanceTask {
        const model = new PlannedMaintenanceTask();
        model.id = item.id;
        model.plannedMaintenanceId = item.plannedMaintenanceId;
        model.description = item.description;
        model.quantityRequired = item.quantityRequired;
        model.uom = item.uom;
        model.dateCreated = item.dateCreated;
        model.dateUpdated = item.dateUpdated;

        return model;
    }
}
