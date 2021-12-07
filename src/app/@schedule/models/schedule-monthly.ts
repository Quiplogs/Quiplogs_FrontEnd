import { Injectable } from '@angular/core';
import { Adapter } from '../../@core/interfaces/adapter';

export class ScheduleMonthly {
    public id: string;
    public plannedMaintenanceId: string;
    public assetId: string;
    public dateLastProcessed: Date;
    public dateNextDue: Date;
    public type: string;
    public recurEvery: number;
    public recurrenceTime: Date;
    public startDate: Date;
    public dateEnd: Date;
    public recurrenceDay: number;

    public constructor(init?: Partial<ScheduleMonthly>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class ScheduleMonthlyAdapter implements Adapter<ScheduleMonthly> {
    adapt(item: any): ScheduleMonthly {
        const model = new ScheduleMonthly();
        model.id = item.id;
        model.plannedMaintenanceId = item.plannedMaintenanceId;
        model.assetId = item.assetId;
        model.dateLastProcessed = item.dateLastProcessed;
        model.dateNextDue = item.dateNextDue;
        model.dateEnd = item.dateEnd;
        model.recurEvery = item.recurEvery;
        model.recurrenceTime = item.recurrenceTime;
        model.startDate = item.startDate;
        model.recurrenceDay = item.recurrenceDay;
        model.type = item.type;

        return model;
    }
}
