import { Injectable } from '@angular/core';
import { Adapter } from '../../@core/interfaces/adapter';

export class ScheduleCustom {
    public id: string;
    public plannedMaintenanceId: string;
    public assetId: string;
    public dateLastProcessed: Date;
    public dateEnd: Date;
    public type: string;
    public recurEvery: number;
    public cycleNextDue: number;
    public startingAt: number;

    public constructor(init?: Partial<ScheduleCustom>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class ScheduleCustomAdapter implements Adapter<ScheduleCustom> {
    adapt(item: any): ScheduleCustom {
        const model = new ScheduleCustom();
        model.id = item.id;
        model.plannedMaintenanceId = item.plannedMaintenanceId;
        model.assetId = item.assetId;
        model.dateLastProcessed = item.dateLastProcessed;
        model.dateEnd = item.dateEnd;
        model.type = item.type;
        model.recurEvery = item.recurEvery;
        model.cycleNextDue = item.cycleNextDue;
        model.startingAt = item.startingAt;

        return model;
    }
}
