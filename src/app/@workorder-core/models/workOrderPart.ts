import { Injectable } from '@angular/core';
import { Adapter } from '../../@core/interfaces/adapter';

export class WorkOrderPart {
    public id: string;
    public workOrderId: string;
    public partId: string;
    public quantityRequired: number;
    public quantityUsed: number;
    public uom: string;
    public partCode: string;
    public dateCreated: Date;
    public dateUpdated: Date;
    public isCompleted: boolean;
    public part: any;
    public canEdit: boolean = false;
    public hasSchedule: boolean;

    public constructor(init?: Partial<WorkOrderPart>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class WorkOrderPartAdapter implements Adapter<WorkOrderPart> {
    adapt(item: any): WorkOrderPart {
        const model = new WorkOrderPart();
        model.id = item.id;
        model.workOrderId = item.workOrderId;
        model.partId = item.partId;
        model.partCode = item.partCode;
        model.quantityRequired = item.quantityRequired;
        model.quantityUsed = item.quantityUsed;
        model.uom = item.uom;
        model.dateCreated = item.dateCreated;
        model.dateUpdated = item.dateUpdated;
        model.isCompleted = item.isCompleted;
        model.part = item.part;

        return model;
    }
}
