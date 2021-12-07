import { Injectable } from '@angular/core';
import { Adapter } from '../../@core/interfaces/adapter';

export class WorkOrderTask {
    public id: string;
    public companyId: string;
    public workOrderId: string;
    public code: string;
    public description: string;
    public uom: string;
    public quantityRequired: number;
    public quantityUsed: number;
    public dateCreated: Date;
    public dateUpdated: Date;

    public constructor(init?: Partial<WorkOrderTask>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class WorkOrderTaskAdapter implements Adapter<WorkOrderTask> {
    adapt(item: any): WorkOrderTask {
        const model = new WorkOrderTask();
        model.id = item.id;
        model.companyId = item.companyId;
        model.workOrderId = item.workOrderId;
        model.code = item.code;
        model.description = item.description;
        model.uom = item.uom;
        model.quantityRequired = item.quantityRequired;
        model.quantityUsed = item.quantityUsed;
        model.dateCreated = item.dateCreated;
        model.dateUpdated = item.dateUpdated;

        return model;
    }
}
