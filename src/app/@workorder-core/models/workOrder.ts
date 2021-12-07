import { Injectable } from '@angular/core';
import { Asset } from '../../@asset-core/models/asset';
import { Adapter } from '../../@core/interfaces/adapter';
import { LocationEntity } from '../../@core/models/location';
import { User } from '../../@core/models/user';
import { WorkOrderPart } from './workOrderPart';
import { WorkOrderTask } from './workOrderTask';

export class WorkOrder {
    public id: string;
    public asset: Asset;
    public assetId: string;
    public companyId: string;
    public referenceNumber: string;
    public notes: string;
    public hoursWorked: number;
    public minutesWorked: number;
    public technicianId: string;
    public technician: User;
    public locationId: string;
    public location: LocationEntity;
    public status: number;
    public priority: number;
    public dateCompleted: Date;
    public isPlanned: boolean;
    public workOrderParts: Array<WorkOrderPart>;
    public workOrderTasks: Array<WorkOrderTask>;
    public dateCreated: Date;
    public dateUpdated: Date;

    public constructor(init?: Partial<WorkOrder>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class WorkOrderAdapter implements Adapter<WorkOrder> {
    adapt(item: any): WorkOrder {
        const model = new WorkOrder();
        model.id = item.id;
        model.asset = item.asset;
        model.assetId = item.assetId;
        model.companyId = item.companyId;
        model.referenceNumber = item.referenceNumber;
        model.notes = item.notes;
        model.hoursWorked = item.hoursWorked;
        model.minutesWorked = item.minutesWorked;
        model.technicianId = item.technicianId;
        model.technician = item.technician;
        model.locationId = item.locationId;
        model.location = item.location;
        model.status = item.status;
        model.priority = item.priority;
        model.dateCompleted = item.dateCompleted;
        model.workOrderParts = item.workOrderParts;
        model.workOrderTasks = item.workOrderTasks;
        model.dateCreated = item.dateCreated;
        model.dateUpdated = item.dateUpdated;
        model.isPlanned = item.isPlanned;

        return model;
    }
}
