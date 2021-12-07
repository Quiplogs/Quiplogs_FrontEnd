import { Injectable } from '@angular/core';
import { Adapter } from '../../@core/interfaces/adapter';

export class Task {
    public id: string;
    public name: string;
    public description: string;
    public companyId: string;
    public dateCreated: Date;
    public dateUpdated: Date;

    public constructor(init?: Partial<Task>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class TaskAdapter implements Adapter<Task> {
    adapt(item: any): Task {
        const model = new Task();
        model.id = item.id;
        model.name = item.name;
        model.description = item.description;
        model.companyId = item.companyId;
        model.dateCreated = item.dateCreated;
        model.dateUpdated = item.dateUpdated;

        return model;
    }
}
