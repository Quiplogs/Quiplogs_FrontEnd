import { Injectable } from '@angular/core';
import { Adapter } from '../../@core/interfaces/adapter';

export class ScheduleWeekly {
    public id: string;
    public plannedMaintenanceId: string;
    public assetId: string;
    public dateLastProcessed: Date;
    public dateNextDue: Date;
    public dateEnd: Date;
    public type: string;
    public recurEvery: number;
    public recurrenceTime: Date;
    public startDate: Date;

    public monday: boolean;
    public tuesday: boolean;
    public wednesday: boolean;
    public thursday: boolean;
    public friday: boolean;
    public saturday: boolean;
    public sunday: boolean;

    public constructor(init?: Partial<ScheduleWeekly>) {
        Object.assign(this, init);
    }
}

@Injectable({
    providedIn: 'root',
})
export class ScheduleWeeklyAdapter implements Adapter<ScheduleWeekly> {
    adapt(item: any): ScheduleWeekly {
        const model = new ScheduleWeekly();
        model.id = item.id;
        model.plannedMaintenanceId = item.plannedMaintenanceId;
        model.assetId = item.assetId;
        model.dateLastProcessed = item.dateLastProcessed;
        model.dateNextDue = item.dateNextDue;
        model.dateEnd = item.dateEnd;
        model.type = item.type;
        model.recurEvery = item.recurEvery;
        model.recurrenceTime = item.recurrenceTime;
        model.startDate = item.startDate;

        model.monday = item.monday;
        model.tuesday = item.tuesday;
        model.wednesday = item.wednesday;
        model.thursday = item.thursday;
        model.friday = item.friday;
        model.saturday = item.saturday;
        model.sunday = item.sunday;

        return model;
    }
}
